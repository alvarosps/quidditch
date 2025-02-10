import { QuidditchTeam } from '@engine/QuidditchTeam';

export type TeamsProviderType = {
    teamToManage: QuidditchTeam | null;
    selectedTeams: QuidditchTeam[];
    setSelectedTeams: (teams: QuidditchTeam[]) => void;
    setTeamToManage: (team: QuidditchTeam) => void;
};
