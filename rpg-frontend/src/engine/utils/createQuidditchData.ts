import { QuidditchPlayerData } from '../../types/Quidditch';

type CreateQuidditchPlayerDataType = {
    modifier: number;
    isMainTeam: boolean;
    isPlaying: boolean;
};

export const createQuidditchPlayerData = ({
    modifier,
    isMainTeam,
    isPlaying,
}: CreateQuidditchPlayerDataType): Partial<QuidditchPlayerData> => {
    const baseQuidditchPlayerObject: Partial<QuidditchPlayerData> = {
        modifier,
        isMainTeam,
        isPlaying,
        hasInjury: false,
    };

    return baseQuidditchPlayerObject;
};
