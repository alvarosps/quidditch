import { createContext, useContext } from 'react';
import { initialTeamsProviderState } from './TeamsProvider.constants';

export const TeamsContext = createContext(initialTeamsProviderState);

export const useTeamsContext = () => {
    const context = useContext(TeamsContext);
    if (!context) {
        throw new Error('useTeamsContext must be used within a TeamsProvider');
    }
    return context;
};
