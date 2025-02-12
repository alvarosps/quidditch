import { PhaseData, SimulationState } from '@_types/Simulation';
import { initialSimulationState } from '../SimulationProvider.constants';
import { useEffect, useRef, useState } from 'react';
import { QuidditchPosition } from '@constants/quidditch';
import { checkForMatchEnd, simulatePhase } from '@engine/utils/simulation';
import { incrementSeekersRoundBonus } from '@engine/utils/simulationPhases';
import { QuidditchMatch } from '@engine/QuidditchMatch';

export const useRoundSimulation = () => {
    const [match, setMatch] = useState<QuidditchMatch | null>(null);
    const [simulationState, setSimulationState] = useState<SimulationState>(
        initialSimulationState
    );
    const [phaseData, setPhaseData] = useState<PhaseData | null>(null);
    const [userInputData, setUserInputData] = useState<{
        knockdown?: QuidditchPosition | null;
        crowd?: QuidditchPosition[] | null;
    }>({});
    const isRoundOver = useRef(false);
    const [score, setScore] = useState({ team1: 0, team2: 0 });

    const handleNeedForUserInput = (
        state: SimulationState,
        typeOfInput: 'crowd' | 'knockdown'
    ) => {
        setPhaseData({
            round: state.currentRound,
            phaseIndex: state.currentPhaseIndex,
            roll: state.lastRoll,
            currentTeam:
                state.currentTeamIndex === 1 ? state.team1 : state.team2,
            typeOfInput,
        });
    };

    const simulateNextPhase = (
        state: SimulationState,
        userInput?: QuidditchPosition | QuidditchPosition[]
    ) => {
        return simulatePhase(state, userInput);
    };

    const simulateNextRound = (
        userInput?: QuidditchPosition | QuidditchPosition[]
    ) => {
        let isMatchOver = checkForMatchEnd(simulationState);
        if (isMatchOver) {
            return;
        }

        const currentRound = simulationState.currentRound;
        let newRound = currentRound;
        let currentState = {
            ...simulationState,
            description: '',
        };
        while (newRound === currentRound && !isMatchOver) {
            const phaseResult = simulateNextPhase(currentState, userInput);

            const { newState, userInputRequired, typeOfInput } = phaseResult;
            currentState = newState;
            newRound = currentState.currentRound;

            setUserInputData({});
            if (userInputRequired) {
                handleNeedForUserInput(newState, typeOfInput);
                isRoundOver.current = false;
                setSimulationState({ ...currentState });
                break;
            } else {
                isMatchOver = checkForMatchEnd(currentState);
                isRoundOver.current = isMatchOver;
            }
            if (newRound > currentRound) {
                if (newRound % 6 === 0) {
                    const stateWithBonus =
                        incrementSeekersRoundBonus(currentState);
                    currentState = { ...stateWithBonus };
                }
            }
        }
        setSimulationState({ ...currentState });
        setScore({
            team1: currentState.team1.getScore(),
            team2: currentState.team2.getScore(),
        });
    };

    const resetMatch = () => {
        if (match) {
            const newMatch = new QuidditchMatch(
                match.getTeam1(),
                match.getTeam2()
            );
            setMatch(newMatch);
        } else {
            setMatch(null);
        }
        setSimulationState(initialSimulationState);
        setScore({ team1: 0, team2: 0 });
    };

    const clearDescription = () => {
        setSimulationState((prev) => ({
            ...prev,
            roundDescriptions: [],
        }));
    };

    useEffect(() => {
        if (userInputData.knockdown) {
            setPhaseData(null);
            simulateNextRound(userInputData.knockdown);
        } else if (userInputData.crowd) {
            setPhaseData(null);
            simulateNextRound(userInputData.crowd);
        }
    }, [userInputData, setPhaseData]);

    useEffect(() => {
        setSimulationState((prev) => ({
            ...prev,
            team1: match?.getTeam1(),
            team2: match?.getTeam2(),
        }));
    }, [match, setSimulationState]);

    return {
        match,
        setMatch,
        simulationState,
        setSimulationState,
        phaseData,
        setUserInputData,
        simulateNextRound,
        resetMatch,
        clearDescription,
        simulateNextPhase,
        isRoundOver,
        score,
    };
};
