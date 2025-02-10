import { QuidditchPlayerData } from '@_types/Quidditch';
import { NPC } from './NPC';
import { PlayableCharacter } from './PlayableCharacter';
import { SchoolHouse } from '@_types/Houses';

export class QuidditchPlayer {
    private name: string;
    private team: SchoolHouse;
    private modifier: number;
    private isMainTeam: boolean;
    private isPlaying: boolean;
    private hasInjury: boolean;
    private crowdBonus: number;
    private forward: number;
    private knockedOut: boolean;

    constructor(
        player: NPC | PlayableCharacter,
        quidditchData: Partial<QuidditchPlayerData>
    ) {
        this.name = player.getName();
        this.team = player.getHouse();
        this.modifier = quidditchData.modifier;
        this.isMainTeam = quidditchData.isMainTeam;
        this.isPlaying = quidditchData.isPlaying;
        this.hasInjury = quidditchData.hasInjury;
        this.forward = 0;
        this.crowdBonus = 0;
        this.knockedOut = false;
    }
    public knockOutPlayer = () => {
        this.knockedOut = true;
        this.isPlaying = false;
        this.isMainTeam = false;
    };
    // Getters and setters
    public getName = (): string => this.name;
    public setName = (name: string): void => {
        this.name = name;
    };
    public getTeam = (): SchoolHouse => this.team;
    public getModifier = (): number => this.modifier;
    public setModifier = (modifier: number): void => {
        this.modifier = modifier;
    };
    public getIsMainTeam = (): boolean => this.isMainTeam;
    public setIsMainTeam = (isMainTeam: boolean): void => {
        this.isMainTeam = isMainTeam;
    };
    public getIsPlaying = (): boolean => this.isPlaying;
    public setIsPlaying = (isPlaying: boolean): void => {
        this.isPlaying = isPlaying;
    };
    public getHasInjury = (): boolean => this.hasInjury;
    public setHasInjury = (hasInjury: boolean): void => {
        this.hasInjury = hasInjury;
    };
    public getCrowdBonus = (): number => this.crowdBonus;
    public setCrowdBonus = (crowdBonus: number): void => {
        this.crowdBonus = crowdBonus;
    };
    public getForward = (): number => this.forward;
    public setForward = (forward: number): void => {
        this.forward = forward;
    };
    public getKnockedOut = (): boolean => this.knockedOut;
    public setKnockedOut = (knockedOut: boolean): void => {
        this.knockedOut = knockedOut;
    };
}
