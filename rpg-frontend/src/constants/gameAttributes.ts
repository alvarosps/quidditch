import { PlayerConditionEffectType } from '@_types/GameAttribute';

export enum GameAttribute {
    Body = 'Body',
    Heart = 'Heart',
    Mind = 'Mind',
    Soul = 'Soul',
    Magic = 'Magic',
}

export enum PlayerCondition {
    Injured = 'Injured',
    Dazed = 'Dazed',
    Upset = 'Upset',
    Exhausted = 'Exhausted',
    Jinxed = 'Jinxed',
}

export const PlayersConditionsEffect: PlayerConditionEffectType = {
    Injured: GameAttribute.Body,
    Dazed: GameAttribute.Mind,
    Upset: GameAttribute.Heart,
    Exhausted: GameAttribute.Soul,
    Jinxed: GameAttribute.Magic,
};
