import { QuidditchMatch } from 'engine/QuidditchMatch';
import { QuidditchMatchScore } from '@_types/Quidditch';
import {
    GameModeType,
    ManualCrowdInput,
    ManualKnockdownInput,
    PhaseData,
    SimulationResult,
    SimulationState,
} from '@_types/Simulation';

export type SimulationMode = 'auto' | 'roundByRound';

export type UserInputData = {
    knockdown?: ManualKnockdownInput | null;
    crowd?: ManualCrowdInput | null;
};

export type SimulationContextType = {
    phaseData: PhaseData | null;
    setUserInputData: (data: UserInputData) => void;
    match: QuidditchMatch | null;
    setMatch: (match: QuidditchMatch | null) => void;
    simulateNextRound: (
        userInput?: ManualKnockdownInput | ManualCrowdInput
    ) => void;
    simulationState: SimulationState;
    simulationMode: SimulationMode;
    toggleAutoMode: () => void;
    setSimulationMode: (mode: GameModeType) => void;
    roundInterval: number;
    setRoundInterval: (ms: number) => void;
    manualKnockdown: boolean;
    setManualKnockdown: (value: boolean) => void;
    manualCrowd: boolean;
    setManualCrowd: (value: boolean) => void;
    round: number;
    score: QuidditchMatchScore;
    clearDescription: () => void;
    isPaused: boolean;
    onPauseToggle: () => void;
    resetMatch: () => void;
    simulateNextPhase: (
        state: SimulationState,
        userInput?: ManualKnockdownInput | ManualCrowdInput
    ) => SimulationResult;
    winner: string;
    matchEnded: boolean;
};
