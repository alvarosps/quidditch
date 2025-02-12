import {
    QuidditchMatchData,
    QuidditchMatchTeamPlayers,
    QuidditchTeamPlayers,
} from '@_types/Quidditch';
import { getDiceRoll } from '@utils/diceRoll';
import { GameModeType, ManualMode } from '@_types/Simulation';
import {
    CATCH_SNITCH_MIN,
    FAILURE_MAX,
    PARTIAL_MAX,
    QuidditchPosition,
    SUCCESS_MAX,
} from '@constants/quidditch';
import { Seeker } from '@models/QuidditchPositions';
import { getPositionPlayers } from './utils/quidditchPlayers';
import { QuidditchPlayer } from '@models/QuidditchPlayer';
export class QuidditchTeam {
    private name: string;
    private players: QuidditchTeamPlayers;
    private opponent: QuidditchTeam | null;
    private mainTeam: QuidditchMatchTeamPlayers = {
        Beater: [],
        Chaser: [],
        Keeper: undefined,
        Seeker: undefined,
    };
    private reserveTeam: QuidditchMatchTeamPlayers = {
        Beater: [],
        Chaser: [],
        Keeper: undefined,
        Seeker: undefined,
    };
    private score: number = 0;
    private crowdModifier: number;

    constructor(
        name: string,
        players: QuidditchTeamPlayers,
        crowdModifier: number,
        opponent: QuidditchTeam | null = null
    ) {
        this.name = name;
        this.players = players;
        this.crowdModifier = crowdModifier;
        this.opponent = opponent;
    }
    public resetTeamState() {
        for (const [position, players] of Object.entries(this.players)) {
            for (const player of players) {
                player.setForward(0);
                player.setCrowdBonus(0);
                player.setKnockedOut(false);
                player.setIsPlaying(
                    player.getIsMainTeam() && !player.getHasInjury()
                );
                if (position === QuidditchPosition.Seeker) {
                    (player as Seeker).setRoundBonus(0);
                }
            }
        }
        this.score = 0;
    }
    public getMatchPlayers() {
        const chasers = getPositionPlayers(this, QuidditchPosition.Chaser);
        const beaters = getPositionPlayers(this, QuidditchPosition.Beater);
        const keepers = getPositionPlayers(this, QuidditchPosition.Keeper);
        const seekers = getPositionPlayers(this, QuidditchPosition.Seeker);
        const mainPlayers: QuidditchMatchTeamPlayers = {
            Beater: beaters.mainTeam,
            Chaser: chasers.mainTeam,
            Keeper: keepers.mainTeam[0],
            Seeker: seekers.mainTeam[0],
        };
        const reservePlayers: QuidditchMatchTeamPlayers = {
            Beater: beaters.reserveTeam,
            Chaser: chasers.reserveTeam,
            Keeper: keepers.reserveTeam[0],
            Seeker: seekers.reserveTeam[0],
        };

        return [mainPlayers, reservePlayers];
    }
    public initializePlayersInGame() {
        this.resetTeamState();
        [this.mainTeam, this.reserveTeam] = this.getMatchPlayers();
    }
    public initializeTeamMatchData(opponent: QuidditchTeam) {
        this.setOpponent(opponent);
        this.initializePlayersInGame();
    }
    public updateCrowdBonus(position: QuidditchPosition, crowdBonus = 1) {
        if (
            position === QuidditchPosition.Chaser ||
            position === QuidditchPosition.Beater
        ) {
            for (const player of this.mainTeam[position]) {
                player.setCrowdBonus(crowdBonus);
            }
        } else {
            const player = this.mainTeam[position];
            if (player) {
                player.setCrowdBonus(crowdBonus);
            }
        }
    }
    public checkIfTeamHasSeekers() {
        return this.mainTeam[QuidditchPosition.Seeker];
    }
    public negativeForwardToBeater(beaterIndex: number) {
        this.mainTeam[QuidditchPosition.Beater][beaterIndex].setForward(-1);
    }
    public checkIfSeekerCanCatchSnitch() {
        return (
            this.getScore() >= this.getOpponent().getScore() ||
            this.getOpponent().getScore() - this.getScore() < 50
        );
    }
    public updateTeamPlayerMainTeam(
        player: QuidditchPlayer,
        position: QuidditchPosition
    ) {
        this.setMainTeam({
            ...this.getMainTeam(),
            [position]:
                position === QuidditchPosition.Seeker ||
                position === QuidditchPosition.Keeper
                    ? player
                    : [...this.getMainTeam()[position], player],
        });
    }
    public getAvailablePositions() {
        return Object.keys(this.getMainTeam()).filter((position) =>
            position === QuidditchPosition.Keeper ||
            position === QuidditchPosition.Seeker
                ? !!this.getMainTeam()[position as QuidditchPosition]
                : (
                      this.getMainTeam()[
                          position as QuidditchPosition
                      ] as QuidditchPlayer[]
                  ).length > 0
        );
    }
    public incrementRoundBonus() {
        const seeker = this.mainTeam.Seeker;
        if (seeker) {
            (seeker as Seeker).setRoundBonus(
                (seeker as Seeker).getRoundBonus() + 1
            );
        }
    }
    // Getters and Setters
    public getName() {
        return this.name;
    }
    public getPlayers() {
        return this.players;
    }
    public getPlayingPlayers() {
        const playingPlayers: QuidditchTeamPlayers = {
            Beater: [],
            Chaser: [],
            Keeper: [],
            Seeker: [],
        };
        const notPlayingPlayers: QuidditchTeamPlayers = {
            Beater: [],
            Chaser: [],
            Keeper: [],
            Seeker: [],
        };
        for (const [position, players] of Object.entries(this.players)) {
            playingPlayers[position as QuidditchPosition] = players.filter(
                (player) => player.getIsPlaying()
            );
            notPlayingPlayers[position as QuidditchPosition] = players.filter(
                (player) => !player.getIsPlaying()
            );
        }

        return [playingPlayers, notPlayingPlayers];
    }
    public getPlayersByPosition(
        position: QuidditchPosition
    ): QuidditchPlayer[] {
        return this.players[position];
    }
    public getOpponent() {
        return this.opponent;
    }
    public setOpponent(opponent: QuidditchTeam) {
        this.opponent = opponent;
    }
    public getMainTeam() {
        return this.mainTeam;
    }
    public setMainTeam(mainTeam: QuidditchMatchTeamPlayers) {
        this.mainTeam = {
            Chaser: [...new Set(mainTeam.Chaser)],
            Beater: [...new Set(mainTeam.Beater)],
            Keeper: mainTeam.Keeper,
            Seeker: mainTeam.Seeker,
        };
    }
    public teamHasSeekerPlaying() {
        return this.mainTeam.Seeker && this.mainTeam.Seeker.getIsPlaying();
    }
    public getPositionPlayersMainTeam(position: QuidditchPosition) {
        return this.mainTeam[position];
    }
    public getReserveTeam() {
        return this.reserveTeam;
    }
    public setReserveTeam(reserveTeam: QuidditchMatchTeamPlayers) {
        this.reserveTeam = reserveTeam;
    }
    public getPositionPlayersReserveTeam(position: QuidditchPosition) {
        return this.reserveTeam[position];
    }
    public getScore() {
        return this.score;
    }
    public setScore(score: number, increment: boolean = false) {
        if (increment) {
            this.score = this.score + score >= 0 ? this.score + score : 0;
            this.score = score;
        } else {
            this.score = score;
        }
    }
    public getCrowdModifier() {
        return this.crowdModifier;
    }
    public setCrowdModifier(crowdModifier: number) {
        this.crowdModifier = crowdModifier;
    }
}
