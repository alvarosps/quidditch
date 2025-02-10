import { QuidditchTeam } from '@engine/QuidditchTeam';
import { ReactNode, useState } from 'react';
import { TeamsContext } from './TeamsProvider.context';
import { TeamsProviderType } from './TeamsProvider.types';

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
    const [teamToManage, setTeamToManage] = useState<QuidditchTeam | null>(
        null
    );
    const [selectedTeams, setSelectedTeams] = useState<QuidditchTeam[]>([]);

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
