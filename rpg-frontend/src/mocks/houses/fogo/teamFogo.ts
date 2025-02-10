import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchTeamPlayers } from '@_types/Quidditch';
import {
    QuidditchFogo_Carlos,
    QuidditchFogo_Dinarte,
    QuidditchFogo_Francisco,
    QuidditchFogo_Guilherme,
    QuidditchFogo_Helena,
    QuidditchFogo_Iuri,
    QuidditchFogo_Lucio,
    QuidditchFogo_Marcelo,
    QuidditchFogo_Marcos,
    QuidditchFogo_Paola,
    QuidditchFogo_Richard,
    QuidditchFogo_Vanessa,
    QuidditchFogo_Vitoria,
    QuidditchFogo_Wesley,
} from './players';

const teamFogoPlayers: QuidditchTeamPlayers = {
    Chaser: [
        QuidditchFogo_Dinarte,
        QuidditchFogo_Lucio,
        QuidditchFogo_Helena,
        QuidditchFogo_Marcelo,
        QuidditchFogo_Paola,
        QuidditchFogo_Richard,
    ],
    Beater: [
        QuidditchFogo_Wesley,
        QuidditchFogo_Marcos,
        QuidditchFogo_Carlos,
        QuidditchFogo_Vitoria,
    ],
    Keeper: [QuidditchFogo_Vanessa, QuidditchFogo_Guilherme],
    Seeker: [QuidditchFogo_Iuri, QuidditchFogo_Francisco],
};

const TORCIDA_FOGO = 1;

export const teamFogo = new QuidditchTeam(
    'Fogo',
    teamFogoPlayers,
    TORCIDA_FOGO
);
