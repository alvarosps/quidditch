import { SimulationState } from '@_types/Simulation';
import {
    QuidditchPosition,
    SIMULATION_STEP_PHASES,
} from '@constants/quidditch';

export const simulatePhase = (
    state: SimulationState,
    userInput?: any // leave any for now
) => {
    if (state.matchEnded) {
        return {
            newState: {
                ...state,
                description: 'Match has ended!',
            },
        };
    }

    const currentPhase = SIMULATION_STEP_PHASES[state.currentPhaseIndex];
    if (currentPhase !== QuidditchPosition.Seeker) {
    }
};
