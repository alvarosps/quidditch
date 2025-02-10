import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchTeamPlayers } from '@_types/Quidditch';
import {
    QuidditchTerra_Alekxander,
    QuidditchTerra_Andreia,
    QuidditchTerra_Angela,
    QuidditchTerra_ApanhadorReserva,
    QuidditchTerra_ArtilheiroReserva1,
    QuidditchTerra_ArtilheiroReserva2,
    QuidditchTerra_ArtilheiroReserva3,
    QuidditchTerra_BatedorReserva1,
    QuidditchTerra_BatedorReserva2,
    QuidditchTerra_Betina,
    QuidditchTerra_Enzo,
    QuidditchTerra_GoleiroReserva,
    QuidditchTerra_Saulo,
    QuidditchTerra_Vanessa,
} from './players';

const teamTerraPlayers: QuidditchTeamPlayers = {
    Chaser: [
        QuidditchTerra_Enzo,
        QuidditchTerra_Andreia,
        QuidditchTerra_Angela,
        QuidditchTerra_ArtilheiroReserva1,
        QuidditchTerra_ArtilheiroReserva2,
        QuidditchTerra_ArtilheiroReserva3,
    ],
    Beater: [
        QuidditchTerra_Saulo,
        QuidditchTerra_Betina,
        QuidditchTerra_BatedorReserva1,
        QuidditchTerra_BatedorReserva2,
    ],
    Keeper: [QuidditchTerra_Vanessa, QuidditchTerra_GoleiroReserva],
    Seeker: [QuidditchTerra_Alekxander, QuidditchTerra_ApanhadorReserva],
};

const TORCIDA_TERRA = 3;

export const teamTerra: QuidditchTeam = new QuidditchTeam(
    'Terra',
    teamTerraPlayers,
    TORCIDA_TERRA
);
