import { RoundDescription, TeamRoundDescription } from '@_types/Simulation';

export const roundPhaseToDescriptionType = {
    Chaser: 'chasersRoundDescription',
    Beater: 'beatersRoundDescription',
    Keeper: 'keepersRoundDescription',
    Seeker: 'seekersRoundDescription',
    crowd: 'crowdsRoundDescription',
};

export const teamRoundDescriptionDefault: TeamRoundDescription = {
    beatersRoundDescription: [],
    chasersRoundDescription: [],
    keepersRoundDescription: [],
    seekersRoundDescription: [],
    crowdsRoundDescription: [],
    score: 0,
};

export const roundDescriptionsDefault: RoundDescription = {
    team1: teamRoundDescriptionDefault,
    team2: teamRoundDescriptionDefault,
    round: 1,
};
