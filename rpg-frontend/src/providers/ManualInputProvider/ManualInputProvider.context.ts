import { createContext, useContext } from 'react';
import { initialManualInputContext } from './ManualInputProvider.constants';
import { ManualInputContextType } from './ManualInputProvider.types';

export const ManualInputContext = createContext<ManualInputContextType>(
    initialManualInputContext
);

export const useManualInputContext = () => {
    const context = useContext(ManualInputContext);
    if (!context) {
        throw new Error(
            'useManualInputContext must be used within a ManualInputProvider'
        );
    }
    return context;
};
