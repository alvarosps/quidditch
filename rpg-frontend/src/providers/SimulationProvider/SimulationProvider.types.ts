import { QuidditchMatch } from 'engine/QuidditchMatch';
import { QuidditchMatchData, QuidditchMatchScore } from '@_types/Quidditch';
import { GameModeType } from '@_types/Simulation';
import { QuidditchPosition } from '@constants/quidditch';

export type SimulationMode = 'auto' | 'roundByRound';

export type SimulationContextType = {
    match: QuidditchMatch | null;
    setMatch: (match: QuidditchMatch | null) => void;
    matchData: QuidditchMatchData | null;
    simulateNextRound: () => Promise<void>;
    mode: SimulationMode;
    toggleAutoMode: () => void;
    setMode: (mode: GameModeType) => void;
    roundInterval: number;
    setRoundInterval: (ms: number) => void;
    manualKnockdown: boolean;
    setManualKnockdown: (value: boolean) => void;
    manualCrowd: boolean;
    setManualCrowd: (value: boolean) => void;
    round: number;
    setRound: (round: number) => void;
    score: QuidditchMatchScore;
    setScore: (score: QuidditchMatchScore) => void;
    description: string;
    setDescription: (description: string) => void;
    isPaused: boolean;
    onPauseToggle: () => void;
    onRequestKnockdown?: () => Promise<QuidditchPosition>;
    onRequestCrowdCheer?: (selections: number) => Promise<QuidditchPosition[]>;
    resetMatch: () => void;
    simulateNextPhase: () => Promise<void>;
};
