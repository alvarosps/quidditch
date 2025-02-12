import { SimulationResult, SimulationState } from '@_types/Simulation';
import {
    FAILURE_MAX,
    PARTIAL_MAX,
    QuidditchPosition,
    SUCCESS_MAX,
} from '@constants/quidditch';
import { getDiceRoll } from '@utils/diceRoll';
import { updateScores } from '../simulation';
import { QuidditchMatchScore } from '@_types/Quidditch';
import { getRoundDescriptionsObjectOnPhase } from '../descriptions';

export const keepersPhase = (state: SimulationState): SimulationResult => {
    const team1Phase = teamKeeperRound(state, 1);
    const team2Phase = teamKeeperRound(team1Phase.newState, 2);

    return {
        newState: {
            ...team2Phase.newState,
            currentPhaseIndex: state.currentPhaseIndex + 1,
        },
    };
};

const teamKeeperRound = (
    state: SimulationState,
    teamIndex: number
): SimulationResult => {
    const currentState = { ...state };
    const team = teamIndex === 1 ? currentState.team1 : currentState.team2;
    const keeperPlaying = team.getMainTeam().Keeper;
    const keepersRoundDescription = [];

    if (!keeperPlaying) {
        keepersRoundDescription.push('Keeper is down!');
        return {
            newState: {
                ...currentState,
                roundDescriptions: getRoundDescriptionsObjectOnPhase(
                    currentState,
                    teamIndex,
                    currentState.currentPhaseIndex,
                    keepersRoundDescription
                ),
            },
        };
    }

    const keeperBonus = keeperPlaying.getPlayerBonus();
    const diceRoll = getDiceRoll(keeperBonus);
    keepersRoundDescription.push(
        `${keeperPlaying.getName()} | Roll: ${diceRoll}`
    );
    let newScores: QuidditchMatchScore;
    if (diceRoll > SUCCESS_MAX) {
        newScores = updateScores(state, {
            teamPoints: 10,
            opponentPoints: -20,
        });
        keepersRoundDescription.push(
            `${keeperPlaying.getName()} saved 30 points!`
        );
    } else if (diceRoll > PARTIAL_MAX) {
        newScores = updateScores(state, {
            teamPoints: 10,
            opponentPoints: -10,
        });
        keepersRoundDescription.push(
            `${keeperPlaying.getName()} saved 20 points!`
        );
    } else if (diceRoll > FAILURE_MAX) {
        newScores = updateScores(state, { opponentPoints: -10 });
        keepersRoundDescription.push(
            `${keeperPlaying.getName()} saved 10 points!`
        );
    } else {
        newScores = updateScores(state, { opponentPoints: 10 });
        keepersRoundDescription.push(`${keeperPlaying.getName()} missed!`);
    }

    keeperPlaying.resetBonus();
    team.updateTeamPlayerMainTeam(keeperPlaying, QuidditchPosition.Keeper);

    return {
        newState: {
            ...state,
            team1: teamIndex === 1 ? team : state.team1,
            team2: teamIndex === 2 ? team : state.team2,
            currentTeamIndex: teamIndex === 1 ? 2 : 1,
            scores: newScores,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                currentState,
                teamIndex,
                currentState.currentPhaseIndex,
                keepersRoundDescription
            ),
        },
    };
};
