import { ReactNode, useEffect } from 'react';
import { SimulationContext } from './SimulationProvider.context';
import { SimulationContextType } from './SimulationProvider.types';
import { useRoundSimulation, useSimulationControls } from './hooks';
import { checkForMatchEnd } from '@engine/utils/simulation';

const SimulationProvider = ({ children }: { children: ReactNode }) => {
    const {
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
    } = useRoundSimulation();

    const {
        simulationMode,
        setSimulationMode,
        toggleAutoMode,
        roundInterval,
        setRoundInterval,
        manualKnockdown,
        setManualKnockdown,
        manualCrowd,
        setManualCrowd,
        isPaused,
        onPauseToggle,
    } = useSimulationControls();

    useEffect(() => {
        setSimulationState((prev) => ({
            ...prev,
            manualMode: {
                knockdown: manualKnockdown,
                crowd: manualCrowd,
            },
        }));
    }, [manualKnockdown, manualCrowd, setSimulationState]);

    useEffect(() => {
        if (
            simulationMode === 'auto' &&
            match &&
            !isPaused &&
            !checkForMatchEnd(simulationState)
        ) {
            const interval = setInterval(() => {
                if (!isRoundOver.current) {
                    simulateNextRound();
                }
            }, roundInterval);
            return () => clearInterval(interval);
        }
    }, [
        simulationMode,
        match,
        isPaused,
        roundInterval,
        simulationState.matchEnded,
        isRoundOver.current,
        simulationState,
    ]);
    const draw = score.team1 === score.team2;
    const winnerTeam =
        score.team1 > score.team2
            ? simulationState.team1?.getName()
            : simulationState.team2?.getName();
    const winner = draw ? 'Draw!' : winnerTeam;

    const contextValue: SimulationContextType = {
        phaseData,
        setUserInputData,
        match,
        setMatch,
        simulateNextRound,
        simulationState,
        simulationMode,
        toggleAutoMode,
        setSimulationMode,
        roundInterval,
        setRoundInterval,
        manualKnockdown,
        setManualKnockdown,
        manualCrowd,
        setManualCrowd,
        round: simulationState.currentRound,
        score,
        clearDescription,
        isPaused,
        onPauseToggle,
        resetMatch,
        simulateNextPhase,
        winner,
        matchEnded: simulationState.matchEnded,
    };

    return (
        <SimulationContext.Provider value={contextValue}>
            {children}
        </SimulationContext.Provider>
    );
};

export { SimulationProvider };
