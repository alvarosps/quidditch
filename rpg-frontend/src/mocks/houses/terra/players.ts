import { createQuidditchPlayerData } from '@engine/utils/createQuidditchData';
import {
    Alekxander,
    Andreia,
    Angela,
    ApanhadorReserva,
    ArtilheiroReserva1,
    ArtilheiroReserva2,
    ArtilheiroReserva3,
    BatedorReserva1,
    BatedorReserva2,
    Betina,
    Enzo,
    GoleiroReserva,
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
export const QuidditchTerra_ArtilheiroReserva1 = new Chaser(
    ArtilheiroReserva1,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchTerra_ArtilheiroReserva2 = new Chaser(
    ArtilheiroReserva2,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchTerra_ArtilheiroReserva3 = new Chaser(
    ArtilheiroReserva3,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Beaters
export const QuidditchTerra_BatedorReserva1 = new Beater(
    BatedorReserva1,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchTerra_BatedorReserva2 = new Beater(
    BatedorReserva2,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Keeper
export const QuidditchTerra_GoleiroReserva = new Keeper(
    GoleiroReserva,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Seeker
export const QuidditchTerra_ApanhadorReserva = new Chaser(
    ApanhadorReserva,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);
