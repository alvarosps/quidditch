import { QuidditchTeam } from '@engine/QuidditchTeam';

export type GameModeType = 'auto' | 'roundByRound';

export type ManualMode = {
    knockdown: boolean;
    crowd: boolean;
};

export type SimulationState = {
    team1: QuidditchTeam;
    team2: QuidditchTeam;
    description: string;
    snitchSpotted: boolean;
    snitchCaught: boolean;
    currentRound: number;
    seekersKnockedOut: number;
    seekerPriority: string | undefined;
    matchEnded: boolean;
    currentPhaseIndex: number;
    currentStepIndex: number;
};

export type SimulationResult = {
    newState: SimulationState;
    userInputRequired?: boolean;
};
