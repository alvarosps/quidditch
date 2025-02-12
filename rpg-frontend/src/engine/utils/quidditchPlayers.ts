import { QuidditchPlayerData } from '@_types/Quidditch';
import { SimulationState } from '@_types/Simulation';
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

export const choosePositionRandomly = (state: SimulationState) => {
    const opponentTeam =
        state.currentTeamIndex === 1 ? state.team2 : state.team1;

    const mainTeamOpponent = opponentTeam.getMainTeam();
    let highestPriority: QuidditchPosition | undefined =
        QuidditchPosition.Seeker;
    if (!mainTeamOpponent[QuidditchPosition.Seeker]) {
        highestPriority = QuidditchPosition.Chaser;
        if (mainTeamOpponent[QuidditchPosition.Chaser].length === 0) {
            highestPriority = QuidditchPosition.Keeper;
            if (!mainTeamOpponent[QuidditchPosition.Keeper]) {
                highestPriority = QuidditchPosition.Beater;
                if (mainTeamOpponent[QuidditchPosition.Beater].length === 0) {
                    highestPriority = undefined;
                }
            }
        }
    }
    if (highestPriority) {
        const positionsToChoose: QuidditchPosition[] = [
            mainTeamOpponent[QuidditchPosition.Keeper]
                ? QuidditchPosition.Keeper
                : highestPriority,
            mainTeamOpponent[QuidditchPosition.Beater].length > 0
                ? QuidditchPosition.Beater
                : highestPriority,
            mainTeamOpponent[QuidditchPosition.Chaser].length > 0
                ? QuidditchPosition.Chaser
                : highestPriority,
            highestPriority,
            highestPriority,
        ];

        const randomIndex = Math.floor(
            Math.random() * positionsToChoose.length
        );
        return positionsToChoose[randomIndex];
    } else {
        return undefined;
    }
};
