import { SimulationResult, SimulationState } from '@_types/Simulation';
import {
    QuidditchPosition,
    SIMULATION_STEP_PHASES,
} from '@constants/quidditch';
import {
    beatersPhase,
    chasersPhase,
    keepersPhase,
    seekersPhase,
} from './simulationPhases';
import { crowdsPhase } from './simulationPhases/crowd';
import { QuidditchMatchScore } from '@_types/Quidditch';

export const simulatePhase = (
    state: SimulationState,
    userInput?: QuidditchPosition | QuidditchPosition[]
): SimulationResult => {
    if (state.matchEnded) {
        return {
            newState: {
                ...state,
                description: 'Match has ended!',
            },
        };
    }

    const currentPhase = SIMULATION_STEP_PHASES[state.currentPhaseIndex];
    let currentState = { ...state };
    if (currentPhase === QuidditchPosition.Chaser) {
        return chasersPhase(currentState);
    } else if (currentPhase === QuidditchPosition.Beater) {
        if (userInput && !Array.isArray(userInput)) {
            return beatersPhase(currentState, userInput as QuidditchPosition);
        } else {
            return beatersPhase(currentState);
        }
    } else if (currentPhase === QuidditchPosition.Keeper) {
        return keepersPhase(currentState);
    } else if (currentPhase === QuidditchPosition.Seeker) {
        return seekersPhase(currentState);
    } else if (currentPhase === 'crowd') {
        if (userInput && Array.isArray(userInput)) {
            return crowdsPhase(currentState, userInput as QuidditchPosition[]);
        } else {
            return crowdsPhase(currentState);
        }
    }
};

export const updateScores = (
    state: SimulationState,
    {
        teamPoints,
        opponentPoints,
    }: {
        teamPoints?: number;
        opponentPoints?: number;
    }
): QuidditchMatchScore => {
    const team1Score = state.team1.getScore();
    const team2Score = state.team2.getScore();
    let updatedScore: QuidditchMatchScore = {
        team1: team1Score,
        team2: team2Score,
    };
    if (state.currentTeamIndex === 1) {
        updatedScore.team1 = teamPoints ? team1Score + teamPoints : team1Score;
        updatedScore.team2 = opponentPoints
            ? team2Score + opponentPoints
            : team2Score;
    } else {
        updatedScore.team2 = teamPoints ? team2Score + teamPoints : team2Score;
        updatedScore.team1 = opponentPoints
            ? team1Score + opponentPoints
            : team1Score;
    }
    state.team1.setScore(updatedScore.team1);
    state.team2.setScore(updatedScore.team2);

    return updatedScore;
};

export const checkForMatchEnd = (state: SimulationState) => {
    if (state.matchEnded || state.snitchCaught) {
        return true;
    }
    if (
        state.countdownAfterTeamSeekersAreKnockedOut === 0 &&
        state.teamSeekersKnockedOut
    ) {
        return true;
    }
    return false;
};
