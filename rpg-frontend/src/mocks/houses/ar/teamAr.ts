import { QuidditchTeam } from '@engine/QuidditchTeam';
import {
    QuidditchAr_Alberto,
    QuidditchAr_Bruna,
    QuidditchAr_Camila,
    QuidditchAr_Duda,
    QuidditchAr_Enzo,
    QuidditchAr_Estelle,
    QuidditchAr_Heitor,
    QuidditchAr_Isadora,
    QuidditchAr_Joana,
    QuidditchAr_Joaquim,
    QuidditchAr_Leonardo,
    QuidditchAr_Marciane,
    QuidditchAr_Max,
    QuidditchAr_Renata,
} from './players';

const teamArPlayers = {
    Chaser: [
        QuidditchAr_Leonardo,
        QuidditchAr_Isadora,
        QuidditchAr_Enzo,
        QuidditchAr_Joana,
        QuidditchAr_Renata,
        QuidditchAr_Marciane,
    ],
    Beater: [
        QuidditchAr_Bruna,
        QuidditchAr_Camila,
        QuidditchAr_Max,
        QuidditchAr_Estelle,
    ],
    Keeper: [QuidditchAr_Heitor, QuidditchAr_Duda],
    Seeker: [QuidditchAr_Alberto, QuidditchAr_Joaquim],
};

const TORCIDA_AR = 0;

export const teamAr: QuidditchTeam = new QuidditchTeam(
    'Ar',
    teamArPlayers,
    TORCIDA_AR
);
