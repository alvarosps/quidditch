import { QuidditchPosition } from '@constants/quidditch';
import { ManualInputContextType } from './ManualInputProvider.types';

export const initialManualInputContext: ManualInputContextType = {
    requestKnockdown: async () => QuidditchPosition.Seeker,
    requestCrowdCheer: async () => [],
};
