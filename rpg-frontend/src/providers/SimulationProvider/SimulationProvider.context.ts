import { createContext, useContext } from 'react';
import { SimulationContextType } from './SimulationProvider.types';
import { initialSimulationData } from './SimulationProvider.constants';

export const SimulationContext = createContext<SimulationContextType>(
    initialSimulationData
);

export const useSimulationContext = () => {
    const context = useContext(SimulationContext);
    if (!context) {
        throw new Error(
            'useSimulationContext must be used within a SimulationProvider'
        );
    }

    return context;
};
