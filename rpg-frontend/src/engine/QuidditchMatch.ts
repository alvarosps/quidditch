import { QuidditchMatchData } from '@_types/Quidditch';
import { getDiceRoll } from '@utils/diceRoll';
import { GameModeType, ManualMode } from '@_types/Simulation';
import { QuidditchTeam } from './QuidditchTeam';
import {
    SIMULATION_STEP_PHASES,
    QuidditchPosition,
} from '@constants/quidditch';

export class QuidditchMatch {
    private team1: QuidditchTeam;
    private team2: QuidditchTeam;
    private matchData: QuidditchMatchData;
    private countdownAfterseekersKnockedOut: number = 10;
    private gameMode: GameModeType = 'roundByRound';
    private currentPhaseIndex: number = 0;

    constructor(
        team1: QuidditchTeam,
        team2: QuidditchTeam,
        gameMode: GameModeType,
        onRequestKnockdown: () => Promise<QuidditchPosition>,
        onRequestCrowdCheer: (
            selections: number
        ) => Promise<QuidditchPosition[]>,
        manualMode: ManualMode
    ) {
        team1.initializeTeamMatchData(
            team2,
            onRequestKnockdown,
            onRequestCrowdCheer,
            manualMode
        );
        team2.initializeTeamMatchData(
            team1,
            onRequestKnockdown,
            onRequestCrowdCheer,
            manualMode
        );
        this.team1 = team1;
        this.team2 = team2;

        this.matchData = {
            description: `${this.team1.getName()} x ${this.team2.getName()} has started!\n`,
            snitchSpotted: false,
            snitchCaught: false,
            currentRound: 1,
            seekersKnockedOut: 0,
            seekerPriority: undefined,
            matchEnded: false,
        };
        this.gameMode = gameMode;
    }
    updateMatchData(data: Partial<QuidditchMatchData>) {
        this.setMatchData({ ...this.matchData, ...data });
    }
    resetMatch() {
        this.setMatchData({
            description: `${this.team1.getName()} x ${this.team2.getName()} has started!\n`,
            snitchSpotted: false,
            snitchCaught: false,
            currentRound: 1,
            seekersKnockedOut: 0,
            seekerPriority: undefined,
            matchEnded: false,
        });
        this.setCountDownAfterSeekersKnockedOut(10);
    }
    checkForMatchEndConditions() {
        const scoreDifference = Math.abs(
            this.team1.getScore() - this.team2.getScore()
        );
        if (scoreDifference >= 250) {
            this.setMatchData({
                ...this.getMatchData(),
                matchEnded: true,
                description: `${this.team1.getName()} won by score difference!`,
            });
        }
    }
    async simulateNextPhase(): Promise<QuidditchMatchData> {
        if (this.getMatchEnded()) return;

        const phase = SIMULATION_STEP_PHASES[this.getCurrentPhaseIndex()];
        let roundData = { ...this.getMatchData() };

        if (phase !== QuidditchPosition.Seeker) {
            roundData = (await this.team1.performRound(
                phase,
                roundData
            )) as QuidditchMatchData;
            roundData = (await this.team2.performRound(
                phase,
                roundData
            )) as QuidditchMatchData;
        } else if (phase === QuidditchPosition.Seeker) {
            await this.matchSeekersRound(phase);
        }

        this.setMatchData({ ...roundData });
        this.setCurrentPhaseIndex(this.getCurrentPhaseIndex() + 1);

        if (this.getCurrentPhaseIndex() >= SIMULATION_STEP_PHASES.length) {
            // Round is finished. Reset phase index and increment round.
            this.setCurrentPhaseIndex(0);

            if (this.getCurrentRound() % 6 === 0) {
                this.team1.incrementRoundBonus();
                this.team2.incrementRoundBonus();
            }
            this.checkForMatchEndConditions();
            this.setMatchData({
                ...this.getMatchData(),
                currentRound: this.getMatchData().currentRound + 1,
            });
        }

        return this.getMatchData();
    }
    async simulateNextRound(): Promise<QuidditchMatchData> {
        while (
            this.getCurrentPhaseIndex() < SIMULATION_STEP_PHASES.length &&
            !this.getMatchEnded()
        ) {
            await this.simulateNextPhase();
        }
        return this.getMatchData();
    }
    async matchSeekersRound(roundType: QuidditchPosition) {
        if (!this.getSeekerPriority()) {
            const roll = getDiceRoll();
            this.setMatchData({
                ...this.getMatchData(),
                seekerPriority:
                    roll > 6 ? this.team1.getName() : this.team2.getName(),
            });
        }
        let seeker1Round;
        let seeker2Round;
        if (this.getSeekerPriority() === this.team1.getName()) {
            seeker1Round = await this.team1.performRound(
                roundType,
                this.getMatchData()
            );
            if (this.getSnitchCaught()) {
                this.setMatchData({
                    ...this.getMatchData(),
                    description: `${this.team1.getName()} caught the snitch, Match is over!`,
                    matchEnded: true,
                });
            } else {
                seeker2Round = this.team2.performRound(
                    roundType,
                    this.getMatchData()
                );
            }
        } else {
            seeker2Round = await this.team2.performRound(
                roundType,
                this.getMatchData()
            );
            if (this.getSnitchCaught()) {
                this.setMatchData({
                    ...this.getMatchData(),
                    description: `${this.team2.getName()} caught the snitch, Match is over!`,
                    matchEnded: true,
                });
            } else {
                seeker1Round = this.team1.performRound(
                    roundType,
                    this.getMatchData()
                );
            }
        }
        const [seeker1Data, seeker1Roll] = seeker1Round as [
            QuidditchMatchData,
            number,
        ];
        const [seeker2Data, seeker2Roll] = seeker2Round as [
            QuidditchMatchData,
            number,
        ];
        this.updateMatchData(seeker1Data);
        this.updateMatchData(seeker2Data);

        let seekerPriority: string;
        if (seeker1Roll === seeker2Roll) {
            const roll = getDiceRoll();
            seekerPriority =
                roll > 6 ? this.team1.getName() : this.team2.getName();
        } else if (seeker1Roll > seeker2Roll) {
            seekerPriority = this.team1.getName();
        } else {
            seekerPriority = this.team2.getName();
        }
        this.updateMatchData({
            seekerPriority,
        });
    }
    // Getters and Setters

    getTeam1() {
        return this.team1;
    }
    getTeam2() {
        return this.team2;
    }
    getMatchData() {
        return this.matchData;
    }
    setMatchData(data: QuidditchMatchData) {
        this.matchData = data;
    }
    getSeekerPriority() {
        return this.matchData.seekerPriority;
    }
    getMatchEnded() {
        return this.matchData.matchEnded;
    }
    getCurrentRound() {
        return this.matchData.currentRound;
    }
    getSnitchCaught() {
        return this.matchData.snitchCaught;
    }
    getCountdownAfterSeekersKnockedOut() {
        return this.countdownAfterseekersKnockedOut;
    }
    setCountDownAfterSeekersKnockedOut(countdown: number) {
        this.countdownAfterseekersKnockedOut = countdown;
    }
    getGameMode() {
        return this.gameMode;
    }
    setGameMode(mode: GameModeType) {
        this.gameMode = mode;
    }
    getCurrentPhaseIndex() {
        return this.currentPhaseIndex;
    }
    setCurrentPhaseIndex(index: number) {
        this.currentPhaseIndex = index;
    }
}
