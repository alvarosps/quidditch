import { createQuidditchPlayerData } from '@engine/utils/createQuidditchData';
import {
    Carlos,
    Francisco,
    Guilherme,
    Helena,
    Iuri,
    Lucio,
    Marcelo,
    Marcos,
    Paola,
    Richard,
    Vitoria,
    Wesley,
} from '@mocks/npcs/fogo';
import { Beater, Chaser, Keeper, Seeker } from '@models/QuidditchPositions';
import { Dinarte } from '@mocks/npcs/agua';
import { Vanessa } from '@mocks/npcs/terra';

// Main Chasers
export const QuidditchFogo_Marcelo = new Chaser(
    Marcelo,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchFogo_Lucio = new Chaser(
    Lucio,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchFogo_Helena = new Chaser(
    Helena,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Beaters
export const QuidditchFogo_Wesley = new Beater(
    Wesley,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchFogo_Marcos = new Beater(
    Marcos,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Keeper
export const QuidditchFogo_Vanessa = new Keeper(
    Vanessa,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Seeker
export const QuidditchFogo_Iuri = new Seeker(
    Iuri,
    createQuidditchPlayerData({
        modifier: 4,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Reserve Chasers
export const QuidditchFogo_Dinarte = new Chaser(
    Dinarte,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchFogo_Paola = new Chaser(
    Paola,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchFogo_Richard = new Chaser(
    Richard,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Beaters
export const QuidditchFogo_Carlos = new Beater(
    Carlos,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchFogo_Vitoria = new Beater(
    Vitoria,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Keeper
export const QuidditchFogo_Guilherme = new Keeper(
    Guilherme,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Seeker
export const QuidditchFogo_Francisco = new Seeker(
    Francisco,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: false,
        isPlaying: false,
    })
);
