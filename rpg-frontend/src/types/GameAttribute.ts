import { GameAttribute, PlayerCondition } from '@constants/gameAttributes';

export type GameAttributeType = {
    [key in GameAttribute]: number;
};

export type SpellType = {
    spellName: string;
    spellYear: number;
    isSignatureSpell?: boolean;
};

export type PlayerConditionType = {
    [key in PlayerCondition]: boolean;
};

export type PlayerConditionEffectType = {
    [key in PlayerCondition]: GameAttribute;
};
