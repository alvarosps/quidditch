import { TeamsProviderType } from './TeamsProvider.types';

export const initialTeamsProviderState: TeamsProviderType = {
    teamToManage: null,
    selectedTeams: [],
    setSelectedTeams: () => {},
    setTeamToManage: () => {},
};
