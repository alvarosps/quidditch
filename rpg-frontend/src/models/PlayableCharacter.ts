import {
    GameAttributeType,
    PlayerConditionType,
    SpellType,
} from '@_types/GameAttribute';
import { SchoolHouse } from '@_types/Houses';
import { NPC } from './NPC';
import { defaultPlayerConditions } from '@constants/player';
import { GameAttribute, PlayerCondition } from '@constants/gameAttributes';

export class PlayableCharacter extends NPC {
    private spellBank?: SpellType[] = [];
    private attributes: GameAttributeType;
    private conditions: PlayerConditionType = defaultPlayerConditions;

    constructor(
        name: string,
        house: SchoolHouse,
        schoolYear: number,
        attributes: GameAttributeType,
        spellBank?: SpellType[]
    ) {
        super(name, house, schoolYear);
        this.attributes = attributes;
        this.spellBank = spellBank;
    }

    public getAttributes = (): GameAttributeType => this.attributes;
    public getSpellBank = (): SpellType[] | undefined => this.spellBank;
    public addSpell = (spell: SpellType): void => {
        if (!this.spellBank) {
            this.spellBank = [];
        }
        this.spellBank.push(spell);
    };
    public getAttribute = (attribute: GameAttribute): number =>
        this.attributes[attribute];
    public setAttribute = (attribute: GameAttribute, value: number): void => {
        this.attributes[attribute] = value;
    };
    public getConditions = (): PlayerConditionType => this.conditions;
    public getCondition = (condition: keyof PlayerConditionType): boolean =>
        this.conditions[condition];
    public setCondition = (
        codition: keyof PlayerConditionType,
        value: boolean
    ): void => {
        this.conditions[codition] = value;
    };
    public rollBody = (forward?: number): number =>
        this.rollDice(
            this.attributes[GameAttribute.Body] -
                (this.getCondition(PlayerCondition.Injured) ? 2 : 0) +
                (forward || 0)
        );
    public rollHeart = (forward?: number): number =>
        this.rollDice(
            this.attributes[GameAttribute.Heart] -
                (this.getCondition(PlayerCondition.Upset) ? 2 : 0) +
                (forward || 0)
        );
    public rollMind = (forward?: number): number =>
        this.rollDice(
            this.attributes[GameAttribute.Mind] -
                (this.getCondition(PlayerCondition.Dazed) ? 2 : 0) +
                (forward || 0)
        );
    public rollSoul = (forward?: number): number =>
        this.rollDice(
            this.attributes[GameAttribute.Soul] -
                (this.getCondition(PlayerCondition.Exhausted) ? 2 : 0) +
                (forward || 0)
        );
    public rollMagic = (forward?: number): number =>
        this.rollDice(
            this.attributes[GameAttribute.Magic] -
                (this.getCondition(PlayerCondition.Jinxed) ? 2 : 0) +
                (forward || 0)
        );
    public castSpell = (spell: SpellType): number => {
        const spellInSpellBank = this.spellBank?.find(
            (spellInBank) => spellInBank.spellName === spell.spellName
        );
        let spellModifier = this.getSchoolYear() - spell.spellYear;
        if (spellInSpellBank) {
            spellModifier += 1 + (spellInSpellBank.isSignatureSpell ? 2 : 0);
        }
        const spellRoll = this.rollMagic(spellModifier);
        return spellRoll;
    };
}
