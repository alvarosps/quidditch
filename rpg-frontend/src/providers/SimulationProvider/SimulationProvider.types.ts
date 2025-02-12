import { QuidditchMatch } from 'engine/QuidditchMatch';
import { QuidditchMatchScore } from '@_types/Quidditch';
import {
    GameModeType,
    PhaseData,
    SimulationResult,
    SimulationState,
} from '@_types/Simulation';
import { QuidditchPosition } from '@constants/quidditch';

export type SimulationMode = 'auto' | 'roundByRound';

export type UserInputData = {
    knockdown?: QuidditchPosition | null;
    crowd?: QuidditchPosition[] | null;
};

export type SimulationContextType = {
    phaseData: PhaseData | null;
    setUserInputData: (data: UserInputData) => void;
    match: QuidditchMatch | null;
    setMatch: (match: QuidditchMatch | null) => void;
    simulateNextRound: (
        userInput?: QuidditchPosition | QuidditchPosition[]
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
        userInput?: QuidditchPosition | QuidditchPosition[]
    ) => SimulationResult;
    winner: string;
    matchEnded: boolean;
};
