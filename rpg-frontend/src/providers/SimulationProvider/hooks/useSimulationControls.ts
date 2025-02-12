import { useState } from 'react';
import { SimulationMode } from '../SimulationProvider.types';

export const useSimulationControls = () => {
    const [simulationMode, setSimulationMode] =
        useState<SimulationMode>('roundByRound');
    const [roundInterval, setRoundInterval] = useState<number>(1000);
    const [manualKnockdown, setManualKnockdown] = useState<boolean>(false);
    const [manualCrowd, setManualCrowd] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState(false);

    const toggleAutoMode = () => {
        setSimulationMode((prev) =>
            prev === 'auto' ? 'roundByRound' : 'auto'
        );
    };

    const onPauseToggle = () => {
        setIsPaused((prev) => !prev);
    };

    return {
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
    };
};
