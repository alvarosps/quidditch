import { CasteloBruxoHouses } from '@constants/houses';
import { PlayableCharacter } from '@models/PlayableCharacter';

export const Alberto = new PlayableCharacter(
    'Alberto Corbyn',
    CasteloBruxoHouses.Ar,
    3,
    {
        Body: 0,
        Heart: -1,
        Soul: 0,
        Mind: 3,
        Magic: 3,
    },
    []
);

export const Joao = new PlayableCharacter(
    'João Pedro',
    CasteloBruxoHouses.Agua,
    3,
    {
        Body: 1,
        Heart: 3,
        Soul: 0,
        Mind: 0,
        Magic: -1,
    },
    []
);

export const Joaquim = new PlayableCharacter(
    'Joaquim Diniz',
    CasteloBruxoHouses.Ar,
    3,
    {
        // Não atualizado com a ficha
        Body: 0,
        Heart: -1,
        Soul: 0,
        Mind: 3,
        Magic: 2,
    },
    []
);

export const Maria = new PlayableCharacter(
    'Maria Augusta',
    CasteloBruxoHouses.Terra,
    3,
    {
        Body: 0,
        Heart: 0,
        Soul: -1,
        Mind: 3,
        Magic: 2,
    },
    []
);

export const Isabella = new PlayableCharacter(
    'Isabella Dawson',
    CasteloBruxoHouses.Terra,
    3,
    {
        // Não atualizado com a ficha
        Body: 0,
        Heart: 2,
        Soul: 0,
        Mind: 1,
        Magic: 2,
    },
    []
);
