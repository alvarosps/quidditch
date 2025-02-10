import { QuidditchPlayerData } from '@_types/Quidditch';
import { QuidditchPosition } from '@constants/quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchPlayer } from '@models/QuidditchPlayer';

export const getPositionPlayers = (
    team: QuidditchTeam,
    position: QuidditchPosition
): {
    mainTeam: QuidditchPlayer[];
    reserveTeam: QuidditchPlayer[];
} => {
    if (position === QuidditchPosition.Keeper || QuidditchPosition.Seeker) {
        return {
            mainTeam: team
                .getPlayersByPosition(position)
                .filter((player) => player.getIsMainTeam()),
            reserveTeam: team
                .getPlayersByPosition(position)
                .filter((player) => !player.getIsMainTeam()),
        };
    } else {
        return {
            mainTeam: team
                .getPlayersByPosition(position)
                .filter((player) => player.getIsMainTeam()),
            reserveTeam: team
                .getPlayersByPosition(position)
                .filter((player) => !player.getIsMainTeam()),
        };
    }
};
