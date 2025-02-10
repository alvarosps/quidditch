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
    private gameMode: GameModeType = 'roundByRound';
    private manualInput: ManualMode = {
        knockdown: false,
        crowd: false,
    };
    private onRequestKnockdown: () => Promise<QuidditchPosition> = async () =>
        QuidditchPosition.Seeker;
    private onRequestCrowdCheer: (
        selections: number
    ) => Promise<QuidditchPosition[]> = async () => [];

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
    resetTeamState() {
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
        this.gameMode = 'roundByRound';
        this.manualInput = {
            knockdown: false,
            crowd: false,
        };
    }
    getMatchPlayers() {
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
    initializePlayersInGame() {
        this.resetTeamState();
        [this.mainTeam, this.reserveTeam] = this.getMatchPlayers();
    }
    initializeTeamMatchData(
        opponent: QuidditchTeam,
        onRequestKnockdown: () => Promise<QuidditchPosition>,
        onRequestCrowdCheer: (
            selections: number
        ) => Promise<QuidditchPosition[]>,
        manualMode: ManualMode
    ) {
        this.setOpponent(opponent);
        this.initializePlayersInGame();
        this.setOnRequestKnockdown(onRequestKnockdown);
        this.setOnRequestCrowdCheer(onRequestCrowdCheer);
        this.setManualInput(manualMode);
    }
    updateCrowdBonus(position: QuidditchPosition, crowdBonus = 1) {
        if (
            position === QuidditchPosition.Chaser ||
            position === QuidditchPosition.Beater
        ) {
            for (const player of this.mainTeam[position]) {
                player.setCrowdBonus(crowdBonus);
            }
        } else {
            const player = this.mainTeam[position];
            player.setCrowdBonus(crowdBonus);
        }
    }
    performSubstitution(player: QuidditchPlayer, position: QuidditchPosition) {
        if (
            position === QuidditchPosition.Chaser ||
            position === QuidditchPosition.Beater
        ) {
            const mainTeamPlayersInPosition =
                this.getPositionPlayersMainTeam(position);
            const reserveTeamPlayersInPosition =
                this.getPositionPlayersReserveTeam(position);

            const reserveTeamPlayerToJoin = reserveTeamPlayersInPosition[0];
            let newMainTeamPosition;
            if (reserveTeamPlayerToJoin) {
                newMainTeamPosition = [
                    ...(mainTeamPlayersInPosition as QuidditchPlayer[]).filter(
                        (mainPlayer) =>
                            mainPlayer.getName() !== player.getName()
                    ),
                    reserveTeamPlayerToJoin,
                ];

                const newReserveTeamPosition = (
                    reserveTeamPlayersInPosition as QuidditchPlayer[]
                ).filter(
                    (reservePlayer) =>
                        reservePlayer.getName() !==
                        reserveTeamPlayerToJoin.getName()
                );
                this.setReserveTeam({
                    ...this.getReserveTeam(),
                    [position]: newReserveTeamPosition,
                });
            } else {
                newMainTeamPosition = (
                    mainTeamPlayersInPosition as QuidditchPlayer[]
                ).filter(
                    (mainPlayer) => mainPlayer.getName() !== player.getName()
                );
            }

            this.setMainTeam({
                ...this.getMainTeam(),
                [position]: newMainTeamPosition,
            });
        } else {
            const reserveTeamPlayerToJoin =
                this.getPositionPlayersReserveTeam(position);
            let newMainTeamPosition;
            if (reserveTeamPlayerToJoin) {
                newMainTeamPosition = reserveTeamPlayerToJoin;
                this.setReserveTeam({
                    ...this.getReserveTeam(),
                    [position]: undefined,
                });
            } else {
                newMainTeamPosition = undefined;
            }
            this.setMainTeam({
                ...this.getMainTeam(),
                [position]: newMainTeamPosition,
            });
        }
    }
    knockOutPlayer(player: QuidditchPlayer, position: QuidditchPosition) {
        player.setKnockedOut(true);
        player.setIsPlaying(false);
        this.performSubstitution(player, position);
    }
    getPlayerBonus(player: QuidditchPlayer, position: QuidditchPosition) {
        let bonus = 0;
        bonus += player.getModifier();
        bonus += player.getForward();
        bonus += player.getCrowdBonus();
        if (position === QuidditchPosition.Seeker) {
            bonus += (player as Seeker).getRoundBonus();
        }
        return bonus;
    }
    choosePositionRandomly() {
        let highestPriority: QuidditchPosition;

        if (this.mainTeam[QuidditchPosition.Seeker]) {
            highestPriority = QuidditchPosition.Seeker;
        } else if (
            this.mainTeam[QuidditchPosition.Seeker] &&
            this.mainTeam[QuidditchPosition.Chaser].length > 0
        ) {
            highestPriority = QuidditchPosition.Chaser;
        } else if (
            this.mainTeam[QuidditchPosition.Chaser].length === 0 &&
            this.mainTeam[QuidditchPosition.Beater].length > 0
        ) {
            highestPriority = QuidditchPosition.Beater;
        } else {
            highestPriority = QuidditchPosition.Keeper;
        }
        const priority = [
            this.mainTeam[QuidditchPosition.Keeper]
                ? QuidditchPosition.Keeper
                : highestPriority,
            this.mainTeam[QuidditchPosition.Beater].length > 0
                ? QuidditchPosition.Beater
                : highestPriority,
            this.mainTeam[QuidditchPosition.Chaser].length > 0
                ? QuidditchPosition.Chaser
                : highestPriority,
            highestPriority,
            highestPriority,
        ];

        const randomIndex = Math.floor(Math.random() * priority.length);
        return priority[randomIndex];
    }
    async updateRoundScore(points: {
        teamPoints?: number;
        opponentPoints?: number;
    }) {
        const { teamPoints, opponentPoints } = points;
        if (teamPoints) {
            this.setScore(teamPoints);
        }
        if (opponentPoints) {
            this.opponent?.setScore(opponentPoints);
        }
    }
    async performRound(
        roundType: QuidditchPosition | 'crowd',
        matchPoints: QuidditchMatchData
    ): Promise<[QuidditchMatchData, number] | QuidditchMatchData> {
        const currentRoundPoints: QuidditchMatchData = {
            ...matchPoints,
        };
        if (roundType === QuidditchPosition.Chaser) {
            return await this.chasersRound(currentRoundPoints);
        } else if (roundType === QuidditchPosition.Beater) {
            return await this.beatersRound(currentRoundPoints);
        } else if (roundType === QuidditchPosition.Keeper) {
            return await this.keeperRound(currentRoundPoints);
        } else if (roundType === QuidditchPosition.Seeker) {
            return await this.seekerRound(currentRoundPoints);
        } else {
            await this.crowdCheer();
            return currentRoundPoints;
        }
    }
    async chasersRound(
        roundPoints: QuidditchMatchData
    ): Promise<QuidditchMatchData> {
        for (const chaser of this.mainTeam[QuidditchPosition.Chaser]) {
            const diceRoll = getDiceRoll(
                this.getPlayerBonus(chaser, QuidditchPosition.Chaser)
            );
            chaser.setForward(0);
            chaser.setCrowdBonus(0);
            roundPoints.description += `\t[Chaser - ${this.getName()}] - Roll: ${diceRoll}\n`;
            if (diceRoll > SUCCESS_MAX) {
                this.updateRoundScore({ teamPoints: 30 });
                roundPoints.description += `\t\t${chaser.getName()} scored 30 points!\n`;
            } else if (diceRoll > PARTIAL_MAX) {
                this.updateRoundScore({ teamPoints: 20 });
                roundPoints.description += `\t\t${chaser.getName()} scored 20 points!\n`;
            } else if (diceRoll > FAILURE_MAX) {
                this.updateRoundScore({ teamPoints: 10 });
                roundPoints.description += `\t\t${chaser.getName()} scored 10 points!\n`;
            } else {
                this.updateRoundScore({ opponentPoints: 10 });
                roundPoints.description += `\t\t${chaser.getName()} missed!\n`;
            }
        }

        return roundPoints;
    }
    getHighestPriorityPositionAvailable() {
        const opponentMainTeam = this.opponent?.mainTeam;
        if (opponentMainTeam) {
            if (opponentMainTeam[QuidditchPosition.Seeker]) {
                return QuidditchPosition.Seeker;
            } else if (
                opponentMainTeam[QuidditchPosition.Seeker] &&
                opponentMainTeam[QuidditchPosition.Chaser].length > 0
            ) {
                return QuidditchPosition.Chaser;
            } else if (
                opponentMainTeam[QuidditchPosition.Chaser].length === 0 &&
                opponentMainTeam[QuidditchPosition.Beater].length > 0
            ) {
                return QuidditchPosition.Beater;
            } else {
                return QuidditchPosition.Keeper;
            }
        }
    }
    async getPositionToKnockOut(
        knockdownHighestPriority: boolean
    ): Promise<QuidditchPosition> {
        let positionToKnockOut: QuidditchPosition;
        if (this.manualInput.knockdown) {
            positionToKnockOut = await this.opponent.onRequestKnockdown();
        } else {
            positionToKnockOut = knockdownHighestPriority
                ? this.getHighestPriorityPositionAvailable()
                : this.opponent?.choosePositionRandomly();
        }
        return positionToKnockOut;
    }
    async getPlayerToKnockOut(
        diceRolls: number[]
    ): Promise<[QuidditchPlayer, QuidditchPosition]> {
        const positionToKnockOut = await this.getPositionToKnockOut(
            diceRolls[0] > SUCCESS_MAX && diceRolls[1] > SUCCESS_MAX
        );
        const opponentPlayerInPosition =
            this.opponent?.mainTeam[positionToKnockOut][0];
        return [opponentPlayerInPosition, positionToKnockOut];
    }
    async beatersRound(
        roundPoints: QuidditchMatchData
    ): Promise<QuidditchMatchData> {
        const diceRolls = [];
        const beaters = this.mainTeam[QuidditchPosition.Beater];
        for (const beater of beaters) {
            const diceRoll = getDiceRoll(
                this.getPlayerBonus(beater, QuidditchPosition.Beater)
            );
            beater.setForward(0);
            beater.setCrowdBonus(0);
            diceRolls.push(diceRoll);
        }
        const [playerToKnockout, positionToKnockOut] =
            await this.getPlayerToKnockOut(diceRolls);

        if (diceRolls.length === 2) {
            const r1 = diceRolls[0];
            const r2 = diceRolls[1];
            if (r1 > SUCCESS_MAX && r2 > SUCCESS_MAX) {
                // 13+ e 13+
                // knockdown main priority, wins 20 points
                this.opponent?.knockOutPlayer(
                    playerToKnockout,
                    positionToKnockOut
                );
                this.updateRoundScore({ teamPoints: 20 });
                roundPoints.description += `\t\t${playerToKnockout.getName()} from Team ${this.getOpponent().getName()} has been knockedown, and Team ${this.getName()} scored 20 points!\n`;
            } else if (
                (r1 > SUCCESS_MAX && r2 > PARTIAL_MAX) ||
                (r2 > SUCCESS_MAX && r1 > PARTIAL_MAX)
            ) {
                // 13+ e 10+
                // knockdown with probability, wins 10 points
                this.opponent?.knockOutPlayer(
                    playerToKnockout,
                    positionToKnockOut
                );
                this.updateRoundScore({ teamPoints: 10 });
                roundPoints.description += `\t\t${playerToKnockout.getName()} from Team ${this.getOpponent().getName()} has been knockedown, and Team ${this.name} scored 10 points!\n`;
            } else if (
                (r1 > SUCCESS_MAX && r2 > FAILURE_MAX) ||
                (r2 > SUCCESS_MAX && r1 > FAILURE_MAX)
            ) {
                // todo 13+ e 7+
                playerToKnockout.setForward(-1);
                this.updateRoundScore({ teamPoints: 10 });
                roundPoints.description += `\t\tThe beaters successfully hit ${playerToKnockout.getName()} from Team ${this.getOpponent().getName()}, but he managed to stay in the game. Team ${this.getName()} scored 10 points!\n`;
            } else if (
                (r1 > SUCCESS_MAX && r2 <= FAILURE_MAX) ||
                (r2 > SUCCESS_MAX && r1 <= FAILURE_MAX)
            ) {
                // todo 13+ e 6-
                if (r1 <= FAILURE_MAX) {
                    this.mainTeam[QuidditchPosition.Beater][0].setForward(-1);
                    roundPoints.description += `\t\t${beaters[0].getName()} from Team ${this.getName()} missed the hit and ended up getting the bludger hitting his broom!\n`;
                } else {
                    this.mainTeam[QuidditchPosition.Beater][1].setForward(-1);
                    roundPoints.description += `\t\t${beaters[1].getName()} from Team ${this.getName()} missed the hit and ended up getting the bludger hitting his broom!\n`;
                }
            } else if (
                (r1 > PARTIAL_MAX && r2 > PARTIAL_MAX) ||
                (r2 > PARTIAL_MAX && r1 > PARTIAL_MAX)
            ) {
                // todo 10+ e 10+
                playerToKnockout.setForward(-1);
                this.updateRoundScore({ teamPoints: 20 });
                roundPoints.description += `\t\tThe beaters successfully hit ${playerToKnockout.getName()} from Team ${this.opponent.getName()}, but he managed to stay in the game. Team ${this.getName()} scored 20 points!\n`;
            } else if (
                (r1 > PARTIAL_MAX && r2 > FAILURE_MAX) ||
                (r2 > PARTIAL_MAX && r1 > FAILURE_MAX)
            ) {
                // 10+ e 7+
                this.updateRoundScore({ teamPoints: 10 });
                roundPoints.description += `\t\tTeam ${this.getName()} scored 10 points with the help of the beaters!\n`;
            } else if (
                (r1 > PARTIAL_MAX && r2 <= FAILURE_MAX) ||
                (r2 > PARTIAL_MAX && r1 <= FAILURE_MAX)
            ) {
                // todo 10+ e 6- -> Nada acontece
                roundPoints.description += `\t\tThe beaters missed the hit!\n`;
            } else if (
                (r1 > FAILURE_MAX && r2 > FAILURE_MAX) ||
                (r2 > FAILURE_MAX && r1 > FAILURE_MAX)
            ) {
                // todo 7+ e 7+ -> Nada acontece
                roundPoints.description += `\t\tThe beaters missed the hit!\n`;
            } else if (
                (r1 > PARTIAL_MAX && r2 <= FAILURE_MAX) ||
                (r2 > PARTIAL_MAX && r1 <= FAILURE_MAX)
            ) {
                // 7+ e 6-
                this.updateRoundScore({ opponentPoints: 10 });

                roundPoints.description += `\t\tThe beaters have hit their own team and because of that ${this.opponent.getName()} scores 10 points!\n`;
            } else if (
                (r1 <= FAILURE_MAX && r2 <= FAILURE_MAX) ||
                (r2 <= FAILURE_MAX && r1 <= FAILURE_MAX)
            ) {
                // 6- e 6-
                this.updateRoundScore({ opponentPoints: 20 });
                roundPoints.description += `\t\tThe beaters have hit their own team and because of that ${this.opponent.getName()} scores 20 points!\n`;
            }
        }

        return roundPoints;
    }
    async keeperRound(
        roundPoints: QuidditchMatchData
    ): Promise<QuidditchMatchData> {
        const keeper = this.mainTeam.Keeper;
        if (keeper) {
            const diceRoll = getDiceRoll(
                this.getPlayerBonus(keeper, QuidditchPosition.Keeper)
            );
            keeper.setCrowdBonus(0);
            keeper.setForward(0);
            roundPoints.description += `\t[Keeper - ${this.getName()}] - Roll: ${diceRoll}\n`;
            if (diceRoll > SUCCESS_MAX) {
                this.updateRoundScore({
                    teamPoints: 10,
                    opponentPoints: -20,
                });
                roundPoints.description += `\t\t${keeper.getName()} saved 30 points!\n`;
            } else if (diceRoll > PARTIAL_MAX) {
                this.updateRoundScore({
                    teamPoints: 10,
                    opponentPoints: -10,
                });
                roundPoints.description += `\t\t${keeper.getName()} saved 20 points!\n`;
            } else if (diceRoll > FAILURE_MAX) {
                this.updateRoundScore({ opponentPoints: -10 });
                roundPoints.description += `\t\t${keeper.getName()} saved 10 points!\n`;
            } else {
                this.updateRoundScore({ opponentPoints: 10 });
                roundPoints.description += `\t\t${keeper.getName()} missed!\n`;
            }
        }
        return roundPoints;
    }
    async seekerRound(
        roundPoints: QuidditchMatchData
    ): Promise<[QuidditchMatchData, number]> {
        const seeker = this.mainTeam.Seeker;
        const diceRoll = getDiceRoll(
            this.getPlayerBonus(seeker, QuidditchPosition.Seeker)
        );
        seeker.setForward(0);
        seeker.setCrowdBonus(0);
        roundPoints.description += `\t[Seeker - ${this.getName()}] - Roll: ${diceRoll}\n`;

        if (!roundPoints.snitchSpotted) {
            if (diceRoll > PARTIAL_MAX) {
                roundPoints.snitchSpotted = true;
                roundPoints.description += `\t${seeker.getName()} of ${this.getName()} spotted the snitch!\n`;
            }

            return [roundPoints, diceRoll];
        } else if (roundPoints.snitchSpotted) {
            if (diceRoll >= CATCH_SNITCH_MIN) {
                if (
                    this.getScore() >= this.opponent.getScore() ||
                    this.opponent.getScore() - this.getScore() < 50
                ) {
                    roundPoints.snitchCaught = true;
                    this.updateRoundScore({ teamPoints: 50 });
                    roundPoints.description += `${seeker.getName()} of ${this.getName()} caught the snitch, scoring 50 points and ending the match!!\n`;
                } else {
                    seeker.setForward(3);
                    roundPoints.description += `${seeker.getName()} of ${this.getName()} is close to the snitch!\n`;
                }
            } else if (diceRoll > PARTIAL_MAX) {
                seeker.setForward(2);
                roundPoints.description += `${seeker.getName()} of ${this.getName()} is getting closer to the snitch!\n`;
            } else if (diceRoll > FAILURE_MAX) {
                seeker.setForward(1);
                roundPoints.description += `${seeker.getName()} of ${this.getName()} is trying to get closer to the snitch!\n`;
            } else {
                seeker.setForward(-2);
                roundPoints.description += `${seeker.getName()} of ${this.getName()} is moving away from the snitch!\n`;
            }
        }
        return [roundPoints, diceRoll];
    }
    async crowdCheer() {
        const diceRoll = getDiceRoll(this.crowdModifier);
        let position1: QuidditchPosition;
        let position2: QuidditchPosition;
        if (this.manualInput.crowd) {
            const [p1, p2] = await this.onRequestCrowdCheer(
                diceRoll > PARTIAL_MAX ? 2 : 1
            );
            position1 = p1;
            position2 = p2;
        } else {
            position1 = this.choosePositionRandomly();
            position2 = this.choosePositionRandomly();
        }
        if (diceRoll > PARTIAL_MAX) {
            this.updateCrowdBonus(position1);
            this.updateCrowdBonus(position2);
        } else if (diceRoll > FAILURE_MAX) {
            position1 = this.choosePositionRandomly();
            this.updateCrowdBonus(position1);
        } else {
            position1 = this.choosePositionRandomly();
            this.updateCrowdBonus(position1, -2);
        }
    }
    incrementRoundBonus() {
        const seeker = this.mainTeam.Seeker;
        if (seeker) {
            (seeker as Seeker).setRoundBonus(
                (seeker as Seeker).getRoundBonus() + 1
            );
        }
    }
    // Getters and Setters
    getName() {
        return this.name;
    }
    getPlayers() {
        return this.players;
    }
    getPlayersByPosition(position: QuidditchPosition): QuidditchPlayer[] {
        return this.players[position];
    }
    getOpponent() {
        return this.opponent;
    }
    setOpponent(opponent: QuidditchTeam) {
        this.opponent = opponent;
    }
    getMainTeam() {
        return this.mainTeam;
    }
    setMainTeam(mainTeam: QuidditchMatchTeamPlayers) {
        this.mainTeam = mainTeam;
    }
    getPositionPlayersMainTeam(position: QuidditchPosition) {
        return this.mainTeam[position];
    }
    getReserveTeam() {
        return this.reserveTeam;
    }
    setReserveTeam(reserveTeam: QuidditchMatchTeamPlayers) {
        this.reserveTeam = reserveTeam;
    }
    getPositionPlayersReserveTeam(position: QuidditchPosition) {
        return this.reserveTeam[position];
    }
    getScore() {
        return this.score;
    }
    setScore(score: number) {
        this.score = score;
    }
    getCrowdModifier() {
        return this.crowdModifier;
    }
    setCrowdModifier(crowdModifier: number) {
        this.crowdModifier = crowdModifier;
    }
    getGameMode() {
        return this.gameMode;
    }
    setGameMode(gameMode: GameModeType) {
        this.gameMode = gameMode;
    }
    getManualInput() {
        return this.manualInput;
    }
    setManualInput(manualInput: ManualMode) {
        this.manualInput = manualInput;
    }
    getManualKnockdownInput() {
        return this.manualInput.knockdown;
    }
    setManualKnockdownInput(knockdown: boolean) {
        this.manualInput.knockdown = knockdown;
    }
    getManualCrowdInput() {
        return this.manualInput.crowd;
    }
    setManualCrowdInput(crowd: boolean) {
        this.manualInput.crowd = crowd;
    }
    getOnRequestKnockdown() {
        return this.onRequestKnockdown;
    }
    setOnRequestKnockdown(
        onRequestKnockdown: () => Promise<QuidditchPosition>
    ) {
        this.onRequestKnockdown = onRequestKnockdown;
    }
    getOnRequestCrowdCheer() {
        return this.onRequestCrowdCheer;
    }
    setOnRequestCrowdCheer(
        onRequestCrowdCheer: (
            selections: number
        ) => Promise<QuidditchPosition[]>
    ) {
        this.onRequestCrowdCheer = onRequestCrowdCheer;
    }
}
