import { QuidditchPosition } from '@constants/quidditch';

export interface ManualInputContextType {
    requestKnockdown: () => Promise<QuidditchPosition>;
    requestCrowdCheer: (selections: number) => Promise<QuidditchPosition[]>;
}
