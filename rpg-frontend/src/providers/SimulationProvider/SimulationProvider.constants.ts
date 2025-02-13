import { SimulationContextType } from './SimulationProvider.types';
import { SimulationState } from '@_types/Simulation';

export const initialSimulationState: SimulationState = {
    team1: null,
    team2: null,
    currentPhaseIndex: 0,
    description: '',
    manualMode: {
        knockdown: false,
        crowd: false,
    },
    lastRoll: 0,
    currentTeamIndex: 1,
    matchEnded: false,
    snitchSpotted: false,
    snitchCaught: false,
    seekerPriority: undefined,
    currentRound: 1,
    stopPhase: false,
    beatersRolls: [],
    countdownAfterTeamSeekersAreKnockedOut: 10,
    teamSeekersKnockedOut: false,
    scores: {
        team1: 0,
        team2: 0,
    },
    roundDescriptions: [],
    crowdRolls: [],
};

export const initialSimulationData: SimulationContextType = {
    phaseData: null,
    setUserInputData: () => {},
    match: null,
    setMatch: () => {},
    simulateNextRound: () => {},
    simulationState: initialSimulationState,
    simulationMode: 'roundByRound',
    toggleAutoMode: () => {},
    setSimulationMode: () => {},
    roundInterval: 1000,
    setRoundInterval: () => {},
    manualKnockdown: false,
    setManualKnockdown: () => {},
    manualCrowd: false,
    setManualCrowd: () => {},
    round: 1,
    score: { team1: 0, team2: 0 },
    isPaused: false,
    onPauseToggle: () => {},
    resetMatch: () => {},
    simulateNextPhase: () => ({ newState: initialSimulationState }),
    clearDescription: () => {},
    winner: '',
    matchEnded: false,
};
