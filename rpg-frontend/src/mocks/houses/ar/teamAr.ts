import { QuidditchTeam } from '@engine/QuidditchTeam';
import {
    QuidditchAr_Alberto,
    QuidditchAr_ArtilheiroReserva1,
    QuidditchAr_ArtilheiroReserva2,
    QuidditchAr_BatedorReserva1,
    QuidditchAr_BatedorReserva2,
    QuidditchAr_Bruna,
    QuidditchAr_Camila,
    QuidditchAr_Enzo,
    QuidditchAr_GoleiroReserva,
    QuidditchAr_Heitor,
    QuidditchAr_Isadora,
    QuidditchAr_Joana,
    QuidditchAr_Joaquim,
    QuidditchAr_Leonardo,
} from './players';

const teamArPlayers = {
    Chaser: [
        QuidditchAr_Leonardo,
        QuidditchAr_Isadora,
        QuidditchAr_Enzo,
        QuidditchAr_Joana,
        QuidditchAr_ArtilheiroReserva1,
        QuidditchAr_ArtilheiroReserva2,
    ],
    Beater: [
        QuidditchAr_Bruna,
        QuidditchAr_Camila,
        QuidditchAr_BatedorReserva1,
        QuidditchAr_BatedorReserva2,
    ],
    Keeper: [QuidditchAr_Heitor, QuidditchAr_GoleiroReserva],
    Seeker: [QuidditchAr_Alberto, QuidditchAr_Joaquim],
};

const TORCIDA_AR = 0;

export const teamAr: QuidditchTeam = new QuidditchTeam(
    'Ar',
    teamArPlayers,
    TORCIDA_AR
);
