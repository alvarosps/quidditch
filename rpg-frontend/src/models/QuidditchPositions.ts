import { QuidditchPlayerData } from '@_types/Quidditch';
import { NPC } from './NPC';
import { PlayableCharacter } from './PlayableCharacter';
import { QuidditchPlayer } from './QuidditchPlayer';

export class Chaser extends QuidditchPlayer {
    constructor(
        player: NPC | PlayableCharacter,
        quidditchData: Partial<QuidditchPlayerData>
    ) {
        super(player, quidditchData);
    }
}

export class Beater extends QuidditchPlayer {
    constructor(
        player: NPC | PlayableCharacter,
        quidditchData: Partial<QuidditchPlayerData>
    ) {
        super(player, quidditchData);
    }
}

export class Keeper extends QuidditchPlayer {
    constructor(
        player: NPC | PlayableCharacter,
        quidditchData: Partial<QuidditchPlayerData>
    ) {
        super(player, quidditchData);
    }
}

export class Seeker extends QuidditchPlayer {
    private roundBonus: number;

    constructor(
        player: NPC | PlayableCharacter,
        quidditchData: Partial<QuidditchPlayerData>
    ) {
        super(player, quidditchData);
        this.roundBonus = 0;
    }

    public getPlayerBonus(): number {
        return super.getPlayerBonus() + this.roundBonus;
    }
    public incrementRoundBonus(): void {
        this.roundBonus += 1;
    }

    public getRoundBonus = (): number => this.roundBonus;
    public setRoundBonus = (roundBonus: number): void => {
        this.roundBonus = roundBonus;
    };
}
