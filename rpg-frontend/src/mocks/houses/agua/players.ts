import { Beater, Chaser, Keeper, Seeker } from '@models/QuidditchPositions';
import {
    Agata,
    Augusto,
    Breno,
    Bruno,
    Diego,
    Dinarte,
    Frederico,
    Gabriela,
    Gustavo,
    Jesus,
    Lucas,
    Manuela,
    Roberto,
} from '@mocks/npcs/agua';
import { createQuidditchPlayerData } from '@engine/utils/createQuidditchData';
import { Joao } from '@mocks/players';

// Main Chasers
export const QuidditchAgua_Manuela = new Chaser(
    Manuela,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchAgua_Joao = new Chaser(
    Joao,
    createQuidditchPlayerData({
        modifier: 5,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchAgua_Frederico = new Chaser(
    Frederico,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Beaters
export const QuidditchAgua_Diego = new Beater(
    Diego,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: true,
        isPlaying: true,
    })
);

export const QuidditchAgua_Gustavo = new Beater(
    Gustavo,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Keeper
export const QuidditchAgua_Breno = new Keeper(
    Breno,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Main Seeker
export const QuidditchAgua_Agata = new Seeker(
    Agata,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: true,
        isPlaying: true,
    })
);

// Reserve Chasers
export const QuidditchAgua_Augusto = new Chaser(
    Augusto,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchAgua_Bruno = new Chaser(
    Bruno,
    createQuidditchPlayerData({
        modifier: 3,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchAgua_Roberto = new Chaser(
    Roberto,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Beaters
export const QuidditchAgua_Gabriela = new Beater(
    Gabriela,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

export const QuidditchAgua_Jesus = new Beater(
    Jesus,
    createQuidditchPlayerData({
        modifier: 1,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Keeper
export const QuidditchAgua_Lucas = new Keeper(
    Lucas,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);

// Reserve Seeker
export const QuidditchAgua_Dinarte = new Seeker(
    Dinarte,
    createQuidditchPlayerData({
        modifier: 2,
        isMainTeam: false,
        isPlaying: false,
    })
);
