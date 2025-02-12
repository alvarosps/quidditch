import { createQuidditchPlayerData } from '@engine/utils/createQuidditchData';
import {
    Alekxander,
    Andreia,
    Angela,
    Betina,
    Eliana,
    Enzo,
    Kristian,
    Luis,
    Luiza,
    Marcelo,
    Melek,
    Pamela,
    Saulo,
    Vanessa,
} from '@mocks/npcs/terra';
import { Beater, Chaser, Keeper, Seeker } from '@models/QuidditchPositions';

// Main Chasers
export const QuidditchTerra_Enzo = new Chaser(
    Enzo,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchTerra_Andreia = new Chaser(
    Andreia,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchTerra_Angela = new Chaser(
    Angela,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Beaters
export const QuidditchTerra_Saulo = new Beater(
    Saulo,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchTerra_Betina = new Beater(
    Betina,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Keeper
export const QuidditchTerra_Vanessa = new Keeper(
    Vanessa,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Seeker
export const QuidditchTerra_Alekxander = new Seeker(
    Alekxander,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Reserve Chasers
export const QuidditchTerra_Kristian = new Chaser(
    Kristian,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchTerra_Melek = new Chaser(
    Melek,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchTerra_Luiza = new Chaser(
    Luiza,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Beaters
export const QuidditchTerra_Luis = new Beater(
    Luis,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchTerra_Pamela = new Beater(
    Pamela,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Keeper
export const QuidditchTerra_Marcelo = new Keeper(
    Marcelo,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Seeker
export const QuidditchTerra_Eliana = new Seeker(
    Eliana,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);
