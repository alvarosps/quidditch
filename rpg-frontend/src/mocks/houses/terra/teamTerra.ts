import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchTeamPlayers } from '@_types/Quidditch';
import {
    QuidditchTerra_Alekxander,
    QuidditchTerra_Andreia,
    QuidditchTerra_Angela,
    QuidditchTerra_Betina,
    QuidditchTerra_Eliana,
    QuidditchTerra_Enzo,
    QuidditchTerra_Kristian,
    QuidditchTerra_Luis,
    QuidditchTerra_Luiza,
    QuidditchTerra_Marcelo,
    QuidditchTerra_Melek,
    QuidditchTerra_Pamela,
    QuidditchTerra_Saulo,
    QuidditchTerra_Vanessa,
} from './players';

const teamTerraPlayers: QuidditchTeamPlayers = {
    Chaser: [
        QuidditchTerra_Enzo,
        QuidditchTerra_Andreia,
        QuidditchTerra_Angela,
        QuidditchTerra_Kristian,
        QuidditchTerra_Melek,
        QuidditchTerra_Luiza,
    ],
    Beater: [
        QuidditchTerra_Saulo,
        QuidditchTerra_Betina,
        QuidditchTerra_Luis,
        QuidditchTerra_Pamela,
    ],
    Keeper: [QuidditchTerra_Vanessa, QuidditchTerra_Marcelo],
    Seeker: [QuidditchTerra_Alekxander, QuidditchTerra_Eliana],
};

const TORCIDA_TERRA = 3;

export const teamTerra: QuidditchTeam = new QuidditchTeam(
    'Terra',
    teamTerraPlayers,
    TORCIDA_TERRA
);
