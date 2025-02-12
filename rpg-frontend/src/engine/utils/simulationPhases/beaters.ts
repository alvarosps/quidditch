import {
    ManualKnockdownInput,
    SimulationResult,
    SimulationState,
} from '@_types/Simulation';
import {
    FAILURE_MAX,
    PARTIAL_MAX,
    QuidditchPosition,
    SUCCESS_MAX,
} from '@constants/quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchPlayer } from '@models/QuidditchPlayer';
import { getDiceRoll } from '@utils/diceRoll';
import { updateScores } from '../simulation';
import { QuidditchMatchScore } from '@_types/Quidditch';
import { getPlayerToKnockout, knockoutPlayer } from '../knockdown';
import { getRoundDescriptionsObjectOnPhase } from '../descriptions';

export const beatersPhase = (
    state: SimulationState,
    userInput?: QuidditchPosition
): SimulationResult => {
    if (state.currentTeamIndex === 1) {
        const team1Phase = teamBeatersRound(state, 1, userInput);
        if (team1Phase.userInputRequired) {
            return team1Phase;
        }
        const team2Phase = teamBeatersRound(team1Phase.newState, 2, userInput);
        if (team2Phase.userInputRequired) {
            return team2Phase;
        }
        return {
            newState: {
                ...team2Phase.newState,
                currentPhaseIndex: state.currentPhaseIndex + 1,
                currentTeamIndex: 2,
            },
        };
    } else {
        const team2Phase = teamBeatersRound(state, 2, userInput);
        if (team2Phase.userInputRequired) {
            return team2Phase;
        }
        return {
            newState: {
                ...team2Phase.newState,
                currentPhaseIndex: state.currentPhaseIndex + 1,
                currentTeamIndex: 1,
            },
        };
    }
};

export const teamBeatersRound = (
    state: SimulationState,
    teamIndex: number,
    userInput?: QuidditchPosition
): SimulationResult => {
    const currentState = { ...state };
    const team = teamIndex === 1 ? currentState.team1 : currentState.team2;
    let beatersRolls: number[] = [];
    const beatersPlaying = team.getMainTeam().Beater;
    const beatersNames = beatersPlaying.map((beater) => beater.getName());

    const beatersRoundDescription = [];

    if (beatersPlaying.length === 0) {
        beatersRoundDescription.push(`Beaters are down!`);
        return {
            newState: {
                ...currentState,
                currentTeamIndex: teamIndex,
                roundDescriptions: getRoundDescriptionsObjectOnPhase(
                    currentState,
                    teamIndex,
                    currentState.currentPhaseIndex,
                    beatersRoundDescription
                ),
            },
            userInputRequired: false,
        };
    }
    if (currentState.beatersRolls.length > 0) {
        beatersRolls = { ...currentState.beatersRolls };
    } else {
        for (const beater of beatersPlaying) {
            const beaterBonus = beater.getPlayerBonus();
            const diceRoll = getDiceRoll(beaterBonus);
            beatersRolls.push(diceRoll);
            beatersRoundDescription.push(
                `${beater.getName()} | Roll: ${diceRoll}`
            );
            beater.resetBonus();
            team.updateTeamPlayerMainTeam(beater, QuidditchPosition.Beater);
        }
    }

    if (
        currentState.manualMode.knockdown &&
        beatersPhaseRequireManualInput(beatersRolls[0], beatersRolls[1] || 0) &&
        !userInput
    ) {
        return {
            newState: {
                ...state,
                beatersRolls:
                    beatersRolls.length === 2
                        ? beatersRolls
                        : [beatersRolls[0], 0],
                roundDescriptions: getRoundDescriptionsObjectOnPhase(
                    currentState,
                    teamIndex,
                    currentState.currentPhaseIndex,
                    beatersRoundDescription
                ),
            },
            userInputRequired: true,
            typeOfInput: 'knockdown',
        };
    }

    const newState = {
        ...currentState,
        roundDescriptions: getRoundDescriptionsObjectOnPhase(
            currentState,
            teamIndex,
            currentState.currentPhaseIndex,
            beatersRoundDescription
        ),
    };

    if (beatersRolls.length === 2) {
        // When both beaters are playing
        return beatersPhaseResultNoInput(
            team,
            beatersRolls,
            beatersNames,
            newState,
            teamIndex,
            userInput,
            beatersRoundDescription
        );
    } else if (beatersRolls.length === 1) {
        // When only one beater is playing
        return beatersPhaseResultNoInputSingleBeater(
            team,
            beatersRolls[0],
            beatersNames[0],
            newState,
            teamIndex,
            userInput,
            beatersRoundDescription
        );
    }
};

const beatersPhaseResultNoInput = (
    team: QuidditchTeam,
    beaterRolls: number[],
    beatersNames: string[],
    state: SimulationState,
    teamIndex: number,
    userInput: QuidditchPosition,
    beatersRoundDescription: string[]
): SimulationResult => {
    let phaseDescription = '';
    let playerToKnockout: QuidditchPlayer;
    let positionToKnockOut: QuidditchPosition;
    const [b1, b2] = beaterRolls;
    if (userInput) {
        if (
            userInput === QuidditchPosition.Seeker ||
            userInput === QuidditchPosition.Keeper
        ) {
            playerToKnockout = team.getMainTeam()[userInput];
        } else {
            playerToKnockout = team.getMainTeam()[userInput][0];
        }
        positionToKnockOut = userInput;
    } else {
        [playerToKnockout, positionToKnockOut] = getPlayerToKnockout(
            state,
            beaterRolls
        );
    }

    const opponentTeam = team.getOpponent();

    let newScores: QuidditchMatchScore;
    if (b1 > SUCCESS_MAX && b2 > SUCCESS_MAX) {
        // 13+ e 13+
        // knockdown main priority, wins 20 points
        if (playerToKnockout && positionToKnockOut) {
            knockoutPlayer(state, playerToKnockout, positionToKnockOut);
        }
        newScores = updateScores(state, { teamPoints: 20 });
        beatersRoundDescription.push(
            `${playerToKnockout.getName()} (${positionToKnockOut}) from Team ${opponentTeam.getName()} has been knockedown, and Team ${team.getName()} scored 20 points!`
        );
    } else if (
        (b1 > SUCCESS_MAX && b2 > PARTIAL_MAX) ||
        (b2 > SUCCESS_MAX && b1 > PARTIAL_MAX)
    ) {
        // 13+ e 10+
        // knockdown with probability, wins 10 points
        if (positionToKnockOut && playerToKnockout) {
            knockoutPlayer(state, playerToKnockout, positionToKnockOut);
        }
        newScores = updateScores(state, { teamPoints: 10 });
        beatersRoundDescription.push(
            `${playerToKnockout.getName()} (${positionToKnockOut}) from Team ${opponentTeam.getName()} has been knockedown, and Team ${team.getName()} scored 10 points!`
        );
    } else if (
        (b1 > SUCCESS_MAX && b2 > FAILURE_MAX) ||
        (b2 > SUCCESS_MAX && b1 > FAILURE_MAX)
    ) {
        // todo 13+ e 7+
        if (playerToKnockout && positionToKnockOut) {
            playerToKnockout.setForward(-1);
            opponentTeam.updateTeamPlayerMainTeam(
                playerToKnockout,
                positionToKnockOut
            );
        }
        newScores = updateScores(state, { teamPoints: 10 });
        beatersRoundDescription.push(
            `The beaters successfully hit ${playerToKnockout.getName()} (${positionToKnockOut}) from Team ${opponentTeam.getName()}, but he managed to stay in the game. Team ${team.getName()} scored 10 points!`
        );
    } else if (
        (b1 > SUCCESS_MAX && b2 <= FAILURE_MAX) ||
        (b2 > SUCCESS_MAX && b1 <= FAILURE_MAX)
    ) {
        // todo 13+ e 6-
        if (b1 <= FAILURE_MAX) {
            team.negativeForwardToBeater(0);
            beatersRoundDescription.push(
                `${beatersNames[0]} from Team ${team.getName()} missed the hit and ended up getting the bludger hitting his broom!`
            );
        } else {
            team.negativeForwardToBeater(1);
            beatersRoundDescription.push(
                `${beatersNames[1]} from Team ${team.getName()} missed the hit and ended up getting the bludger hitting his broom!`
            );
        }
    } else if (
        (b1 > PARTIAL_MAX && b2 > PARTIAL_MAX) ||
        (b2 > PARTIAL_MAX && b1 > PARTIAL_MAX)
    ) {
        // todo 10+ e 10+
        if (playerToKnockout && positionToKnockOut) {
            playerToKnockout.setForward(-1);
            opponentTeam.updateTeamPlayerMainTeam(
                playerToKnockout,
                positionToKnockOut
            );
        }
        newScores = updateScores(state, { teamPoints: 20 });
        beatersRoundDescription.push(
            `The beaters successfully hit ${playerToKnockout.getName()} from Team ${opponentTeam.getName()}, but he managed to stay in the game. Team ${team.getName()} scored 20 points!`
        );
    } else if (
        (b1 > PARTIAL_MAX && b2 > FAILURE_MAX) ||
        (b2 > PARTIAL_MAX && b1 > FAILURE_MAX)
    ) {
        // 10+ e 7+
        newScores = updateScores(state, { teamPoints: 10 });
        beatersRoundDescription.push(
            `Team ${team.getName()} scored 10 points with the help of the beaters!`
        );
    } else if (
        (b1 > PARTIAL_MAX && b2 <= FAILURE_MAX) ||
        (b2 > PARTIAL_MAX && b1 <= FAILURE_MAX)
    ) {
        // todo 10+ e 6- -> Nada acontece
        beatersRoundDescription.push(`The beaters missed the hit!`);
    } else if (
        (b1 > FAILURE_MAX && b2 > FAILURE_MAX) ||
        (b2 > FAILURE_MAX && b1 > FAILURE_MAX)
    ) {
        // todo 7+ e 7+ -> Nada acontece
        beatersRoundDescription.push(`The beaters missed the hit!`);
    } else if (
        (b1 > FAILURE_MAX && b2 <= FAILURE_MAX) ||
        (b2 > FAILURE_MAX && b1 <= FAILURE_MAX)
    ) {
        // 7+ e 6-
        newScores = updateScores(state, { opponentPoints: 10 });

        beatersRoundDescription.push(
            `The beaters have hit their own team and because of that ${opponentTeam.getName()} scores 10 points!`
        );
    } else if (
        (b1 <= FAILURE_MAX && b2 <= FAILURE_MAX) ||
        (b2 <= FAILURE_MAX && b1 <= FAILURE_MAX)
    ) {
        // 6- e 6-
        newScores = updateScores(state, { opponentPoints: 20 });
        beatersRoundDescription.push(
            `The beaters have hit their own team and because of that ${opponentTeam.getName()} scores 20 points!`
        );
    }

    return {
        newState: {
            ...state,
            team1: teamIndex === 1 ? team : opponentTeam,
            team2: teamIndex === 2 ? team : opponentTeam,
            currentTeamIndex: teamIndex === 1 ? 2 : 1,
            beatersRolls: [],
            teamSeekersKnockedOut:
                state.teamSeekersKnockedOut || !team.checkIfTeamHasSeekers(),
            scores: newScores,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                state,
                teamIndex,
                state.currentPhaseIndex,
                beatersRoundDescription
            ),
        },
        userInputRequired: false,
    };
};

const beatersPhaseResultNoInputSingleBeater = (
    team: QuidditchTeam,
    beaterRoll: number,
    beaterName: string,
    state: SimulationState,
    teamIndex: number,
    userInput: QuidditchPosition,
    beatersRoundDescription: string[]
): SimulationResult => {
    let playerToKnockout: QuidditchPlayer;
    let positionToKnockOut: QuidditchPosition;
    if (userInput) {
        if (
            userInput === QuidditchPosition.Seeker ||
            userInput === QuidditchPosition.Keeper
        ) {
            playerToKnockout = team.getMainTeam()[userInput];
        } else {
            playerToKnockout = team.getMainTeam()[userInput][0];
        }
        positionToKnockOut = userInput;
    } else {
        [playerToKnockout, positionToKnockOut] = getPlayerToKnockout(state, [
            beaterRoll,
            0,
        ]);
    }

    let newScores: QuidditchMatchScore;
    if (beaterRoll > SUCCESS_MAX) {
        playerToKnockout.setForward(-1);
        newScores = updateScores(state, { teamPoints: 10 });
        beatersRoundDescription.push(
            `${beaterName} successfully hit ${playerToKnockout.getName()} (${positionToKnockOut}) from Team ${team.getOpponent().getName()}, but he managed to stay in the game. Team ${team.getName()} scored 10 points!`
        );
    } else if (beaterRoll > PARTIAL_MAX) {
        newScores = updateScores(state, { teamPoints: 10 });
        beatersRoundDescription.push(`${beaterName} scored 10 points!`);
    } else if (beaterRoll > FAILURE_MAX) {
        // Nothing helps
        beatersRoundDescription.push(`\t\t${beaterName} missed the hit!`);
    } else {
        newScores = updateScores(state, { opponentPoints: 10 });
        beatersRoundDescription.push(
            `\t\t${beaterName} hit his own team and because of that ${team.getOpponent().getName()} scored 10 points!`
        );
    }

    return {
        newState: {
            ...state,
            scores: newScores,
            beatersRolls: [],
            team1: teamIndex === 1 ? team : state.team1,
            team2: teamIndex === 2 ? team : state.team2,
            currentTeamIndex: teamIndex === 1 ? 2 : 1,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                state,
                teamIndex,
                state.currentPhaseIndex,
                beatersRoundDescription
            ),
        },
    };
};

const beatersPhaseRequireManualInput = (b1: number, b2: number) =>
    (b1 > SUCCESS_MAX && b2 > SUCCESS_MAX) ||
    (b1 > SUCCESS_MAX && b2 > PARTIAL_MAX) ||
    (b2 > SUCCESS_MAX && b1 > PARTIAL_MAX) ||
    (b1 > SUCCESS_MAX && b2 > FAILURE_MAX) ||
    (b2 > SUCCESS_MAX && b1 > FAILURE_MAX) ||
    (b1 > PARTIAL_MAX && b2 > PARTIAL_MAX) ||
    (b2 > PARTIAL_MAX && b1 > PARTIAL_MAX);
