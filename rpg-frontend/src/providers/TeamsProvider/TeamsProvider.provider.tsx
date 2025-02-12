import { QuidditchTeam } from '@engine/QuidditchTeam';
import { ReactNode, useEffect, useState } from 'react';
import { TeamsContext } from './TeamsProvider.context';
import { TeamsProviderType } from './TeamsProvider.types';
import { useSimulationContext } from '@providers/SimulationProvider';

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
    const { resetMatch } = useSimulationContext();
    const [teamToManage, setTeamToManage] = useState<QuidditchTeam | null>(
        null
    );
    const [selectedTeams, setSelectedTeams] = useState<QuidditchTeam[]>([]);

    useEffect(() => {
        resetMatch();
    }, [selectedTeams]);

    const contextValue: TeamsProviderType = {
        teamToManage,
        setTeamToManage,
        selectedTeams,
        setSelectedTeams,
    };

    return (
        <TeamsContext.Provider value={contextValue}>
            {children}
        </TeamsContext.Provider>
    );
};
