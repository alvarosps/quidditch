import { SimulationState } from '@_types/Simulation';
import { QuidditchPosition, SUCCESS_MAX } from '@constants/quidditch';
import { QuidditchPlayer } from '@models/QuidditchPlayer';
import { Seeker } from '@models/QuidditchPositions';
import { choosePositionRandomly } from './quidditchPlayers';

export const getPlayerToKnockout = (
    state: SimulationState,
    diceRolls: number[]
) => {
    const position = getPositionToKnockout(
        state,
        diceRolls[0] > SUCCESS_MAX && diceRolls[1] > SUCCESS_MAX
    );
    const opponentTeam =
        state.currentTeamIndex === 1 ? state.team2 : state.team1;
    const mainTeamOpponent = opponentTeam.getMainTeam();
    const player =
        position === QuidditchPosition.Seeker ||
        position === QuidditchPosition.Keeper
            ? mainTeamOpponent[position]
            : mainTeamOpponent[position][0];
    return [player, position] as [QuidditchPlayer, QuidditchPosition];
};

export const getPositionToKnockout = (
    state: SimulationState,
    shouldKnockdownHighestPriority: boolean
) => {
    const positionToKnockout: QuidditchPosition = shouldKnockdownHighestPriority
        ? getHighestPriorityPositionAvailableOnOpponent(state)
        : choosePositionRandomly(state);
    return positionToKnockout;
};

export const getHighestPriorityPositionAvailable = (state: SimulationState) => {
    const team = state.currentTeamIndex === 1 ? state.team1 : state.team2;

    const mainTeam = team.getMainTeam();
    if (mainTeam[QuidditchPosition.Seeker]) {
        return QuidditchPosition.Seeker;
    } else if (mainTeam[QuidditchPosition.Chaser].length > 0) {
        return QuidditchPosition.Chaser;
    } else if (mainTeam[QuidditchPosition.Keeper]) {
        return QuidditchPosition.Keeper;
    } else if (mainTeam[QuidditchPosition.Beater].length > 0) {
        return QuidditchPosition.Beater;
    }
};

export const getHighestPriorityPositionAvailableOnOpponent = (
    state: SimulationState
) => {
    const opponentTeam =
        state.currentTeamIndex === 1 ? state.team2 : state.team1;

    const mainTeamOpponent = opponentTeam.getMainTeam();
    if (mainTeamOpponent[QuidditchPosition.Seeker]) {
        return QuidditchPosition.Seeker;
    } else if (mainTeamOpponent[QuidditchPosition.Chaser].length > 0) {
        return QuidditchPosition.Chaser;
    } else if (mainTeamOpponent[QuidditchPosition.Keeper]) {
        return QuidditchPosition.Keeper;
    } else if (mainTeamOpponent[QuidditchPosition.Beater].length > 0) {
        return QuidditchPosition.Beater;
    }
};

export const knockoutPlayer = (
    state: SimulationState,
    player: QuidditchPlayer,
    position: QuidditchPosition
) => {
    const opponentTeam =
        state.currentTeamIndex === 1 ? state.team2 : state.team1;
    const mainTeamOpponent = opponentTeam.getMainTeam();
    const reserveTeamOpponent = opponentTeam.getReserveTeam();
    if (
        position === QuidditchPosition.Seeker ||
        position === QuidditchPosition.Keeper
    ) {
        let roundBonus: number | undefined;
        const mainPlayer = mainTeamOpponent[position];
        if (mainPlayer instanceof Seeker) {
            roundBonus = mainPlayer.getRoundBonus();
        }
        if (mainPlayer) {
            mainPlayer.setKnockedOut(true);
            mainPlayer.setIsPlaying(false);
            const reservePlayer = reserveTeamOpponent[position];
            if (reservePlayer) {
                reservePlayer.setIsPlaying(true);
                if (roundBonus) {
                    (reservePlayer as Seeker).setRoundBonus(roundBonus);
                }
                mainTeamOpponent[position] = reservePlayer;
                reserveTeamOpponent[position] = undefined;
                if (state.currentTeamIndex === 1) {
                    state.team2.setMainTeam({ ...mainTeamOpponent });
                    state.team2.setReserveTeam({ ...reserveTeamOpponent });
                } else {
                    state.team1.setMainTeam({ ...mainTeamOpponent });
                    state.team1.setReserveTeam({ ...reserveTeamOpponent });
                }
            } else {
                mainTeamOpponent[position] = undefined;
                state.currentTeamIndex === 1
                    ? state.team2.setMainTeam({ ...mainTeamOpponent })
                    : state.team1.setMainTeam({ ...mainTeamOpponent });
            }
        }
    } else {
        const reservePlayer = reserveTeamOpponent[position][0];
        if (reservePlayer) {
            reservePlayer.setKnockedOut(true);
            reservePlayer.setIsPlaying(false);
            reserveTeamOpponent[position] = reserveTeamOpponent[
                position
            ].filter((p) => p !== reservePlayer);
            mainTeamOpponent[position] = mainTeamOpponent[position].filter(
                (p) => p !== player
            );
            mainTeamOpponent[position].push(reservePlayer);
            if (state.currentTeamIndex === 1) {
                state.team2.setMainTeam({ ...mainTeamOpponent });
                state.team2.setReserveTeam({ ...reserveTeamOpponent });
            } else {
                state.team1.setMainTeam({ ...mainTeamOpponent });
                state.team1.setReserveTeam({ ...reserveTeamOpponent });
            }
        } else {
            mainTeamOpponent[position] = mainTeamOpponent[position].filter(
                (p) => p !== player
            );
            state.currentTeamIndex === 1
                ? state.team2.setMainTeam({ ...mainTeamOpponent })
                : state.team1.setMainTeam({ ...mainTeamOpponent });
        }
    }
    return mainTeamOpponent;
};
