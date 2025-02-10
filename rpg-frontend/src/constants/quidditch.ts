import { GameAttribute } from './gameAttributes';

export const MAX_CHASERS = 3;
export const MAX_BEATERS = 2;
export const MAX_KEEPERS = 1;
export const MAX_SEEKERS = 1;

export const FAILURE_MAX = 6;
export const PARTIAL_MAX = 9;
export const SUCCESS_MAX = 12;
export const GREATER_SUCCESS_MAX = 14;
export const CATCH_SNITCH_MIN = 15;

export enum QuidditchPosition {
    Beater = 'Beater',
    Chaser = 'Chaser',
    Keeper = 'Keeper',
    Seeker = 'Seeker',
}

export const QuidditchPositionAttribute = {
    [QuidditchPosition.Beater]: GameAttribute.Body,
    [QuidditchPosition.Chaser]: GameAttribute.Heart,
    [QuidditchPosition.Keeper]: GameAttribute.Soul,
    [QuidditchPosition.Seeker]: GameAttribute.Mind,
};

export const PositionMaxPlayers = {
    [QuidditchPosition.Beater]: MAX_BEATERS,
    [QuidditchPosition.Chaser]: MAX_CHASERS,
    [QuidditchPosition.Keeper]: MAX_KEEPERS,
    [QuidditchPosition.Seeker]: MAX_SEEKERS,
};

export const SIMULATION_STEP_PHASES: (QuidditchPosition | 'crowd')[] = [
    QuidditchPosition.Chaser,
    QuidditchPosition.Beater,
    QuidditchPosition.Keeper,
    QuidditchPosition.Seeker,
    'crowd',
];
