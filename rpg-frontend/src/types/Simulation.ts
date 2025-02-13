import { QuidditchPosition } from '@constants/quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchMatchScore } from './Quidditch';

export type GameModeType = 'auto' | 'roundByRound';

export type ManualMode = {
    knockdown: boolean;
    crowd: boolean;
};

export type TeamRoundDescription = {
    chasersRoundDescription: string[];
    beatersRoundDescription: string[];
    keepersRoundDescription: string[];
    seekersRoundDescription: string[];
    crowdsRoundDescription: string[];
    score: number;
};

export type RoundDescription = {
    team1: TeamRoundDescription;
    team2: TeamRoundDescription;
    round: number;
};

export type SimulationState = {
    team1: QuidditchTeam | null;
    team2: QuidditchTeam | null;
    scores: QuidditchMatchScore;
    currentPhaseIndex: number;
    description: string;
    manualMode: ManualMode;
    lastRoll: number;
    currentTeamIndex: number;
    matchEnded: boolean;
    snitchSpotted: boolean;
    snitchCaught: boolean;
    seekerPriority: string | undefined;
    currentRound: number;
    stopPhase: boolean;
    beatersRolls: number[][];
    teamSeekersKnockedOut: boolean;
    countdownAfterTeamSeekersAreKnockedOut: number;
    roundDescriptions: RoundDescription[];
    crowdRolls: number[];
};

export type SimulationResult = {
    newState: SimulationState;
    userInputRequired?: boolean;
    typeOfInput?: 'knockdown' | 'crowd';
};

export type ManualKnockdownInput = {
    team1: QuidditchPosition;
    team2: QuidditchPosition;
};

export type ManualCrowdInput = {
    team1: {
        position1: QuidditchPosition;
        position2?: QuidditchPosition;
    };
    team2: {
        position1: QuidditchPosition;
        position2?: QuidditchPosition;
    };
};

export type ManualInput = {
    knockdown?: ManualKnockdownInput;
    crowd?: ManualCrowdInput;
};

export type PhaseData = {
    round: number;
    phaseIndex: number;
    roll: number;
    rollTeam1: number;
    rollTeam2: number;
    beaterRolls: number[][];
    currentTeam: QuidditchTeam;
    team1: QuidditchTeam;
    team2: QuidditchTeam;
    typeOfInput?: 'knockdown' | 'crowd';
};
