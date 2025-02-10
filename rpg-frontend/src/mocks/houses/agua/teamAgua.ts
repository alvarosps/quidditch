import { QuidditchTeamPlayers } from '@_types/Quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import {
    QuidditchAgua_Agata,
    QuidditchAgua_Augusto,
    QuidditchAgua_Breno,
    QuidditchAgua_Bruno,
    QuidditchAgua_Diego,
    QuidditchAgua_Dinarte,
    QuidditchAgua_Frederico,
    QuidditchAgua_Gabriela,
    QuidditchAgua_Gustavo,
    QuidditchAgua_Jesus,
    QuidditchAgua_Joao,
    QuidditchAgua_Lucas,
    QuidditchAgua_Manuela,
    QuidditchAgua_Roberto,
} from './players';

const teamAguaPlayers: QuidditchTeamPlayers = {
    Chaser: [
        QuidditchAgua_Manuela,
        QuidditchAgua_Joao,
        QuidditchAgua_Frederico,
        QuidditchAgua_Augusto,
        QuidditchAgua_Bruno,
        QuidditchAgua_Roberto,
    ],
    Beater: [
        QuidditchAgua_Diego,
        QuidditchAgua_Gustavo,
        QuidditchAgua_Gabriela,
        QuidditchAgua_Jesus,
    ],
    Keeper: [QuidditchAgua_Breno, QuidditchAgua_Lucas],
    Seeker: [QuidditchAgua_Agata, QuidditchAgua_Dinarte],
};

const TORCIDA_AGUA = 2;

export const TeamAgua = new QuidditchTeam(
    'Água',
    teamAguaPlayers,
    TORCIDA_AGUA
);
