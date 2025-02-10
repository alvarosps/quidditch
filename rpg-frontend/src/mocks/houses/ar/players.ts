import { createQuidditchPlayerData } from '@engine/utils/createQuidditchData';
import { Beater, Chaser, Keeper, Seeker } from '@models/QuidditchPositions';
import {
    ArtilheiroReserva1,
    ArtilheiroReserva2,
    BatedorReserva1,
    BatedorReserva2,
    Bruna,
    Camila,
    Enzo,
    GoleiroReserva,
    Heitor,
    Isadora,
    Joana,
    Leonardo,
    Nichollas,
} from '@mocks/npcs/ar';
import { Alberto, Joaquim } from '@mocks/players';

// Main Chasers
export const QuidditchAr_Joana = new Chaser(
    Joana,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchAr_Isadora = new Chaser(
    Isadora,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchAr_Enzo = new Chaser(
    Enzo,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Beaters
export const QuidditchAr_Bruna = new Beater(
    Bruna,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchAr_Camila = new Beater(
    Camila,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Keeper
export const QuidditchAr_Heitor = new Keeper(
    Heitor,
    createQuidditchPlayerData({
        modifier: 4,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Seeker
export const QuidditchAr_Alberto = new Seeker(
    Alberto,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Reserve Chasers
export const QuidditchAr_Leonardo = new Chaser(
    Leonardo,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchAr_ArtilheiroReserva1 = new Chaser(
    ArtilheiroReserva1,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchAr_ArtilheiroReserva2 = new Chaser(
    ArtilheiroReserva2,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Beaters
export const QuidditchAr_BatedorReserva1 = new Beater(
    BatedorReserva1,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchAr_BatedorReserva2 = new Beater(
    BatedorReserva2,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Keeper
export const QuidditchAr_GoleiroReserva = new Keeper(
    GoleiroReserva,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: false,
        isPlaying: false,
    })
);

// // Reserve Seeker
export const QuidditchAr_Joaquim = new Seeker(
    Joaquim,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Extra Players
export const QuidditchAr_Nichollas = new Seeker(
    Nichollas,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);
