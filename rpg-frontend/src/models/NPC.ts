import { SchoolHouse } from '@_types/Houses';
import { getDiceRoll } from '@utils/diceRoll';

export class NPC {
    private name: string;
    private house?: SchoolHouse;
    private schoolYear?: number;

    constructor(name: string, house?: SchoolHouse, schoolYear?: number) {
        this.name = name;
        this.house = house;
        this.schoolYear = schoolYear;
    }

    public getName = (): string => this.name;
    public getHouse = (): SchoolHouse | undefined => this.house;
    public getSchoolYear = (): number | undefined => this.schoolYear;
    public modifySchoolYear = (schoolYear: number): void => {
        this.schoolYear = schoolYear;
    };
    public rollDice = (modifiers?: number) => getDiceRoll(modifiers);
}
