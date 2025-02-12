import { SimulationResult, SimulationState } from '@_types/Simulation';
import {
    FAILURE_MAX,
    PARTIAL_MAX,
    QuidditchPosition,
    SUCCESS_MAX,
} from '@constants/quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { getDiceRoll } from '@utils/diceRoll';
import { updateScores } from '../simulation';
import { QuidditchMatchScore } from '@_types/Quidditch';
import { getRoundDescriptionsObjectOnPhase } from '../descriptions';

export const chasersPhase = (state: SimulationState): SimulationResult => {
    const team1Phase = teamChasersRound(state, 1);
    const team2Phase = teamChasersRound(team1Phase, 2);

    return {
        newState: {
            ...team2Phase,
            currentPhaseIndex: state.currentPhaseIndex + 1,
        },
    };
};

const teamChasersRound = (
    state: SimulationState,
    teamIndex: number
): SimulationState => {
    const team = teamIndex === 1 ? state.team1 : state.team2;
    const chasersPlaying = team.getMainTeam().Chaser;
    const currentState = { ...state };
    const chasersRoundDescription = [];

    if (chasersPlaying.length === 0) {
        chasersRoundDescription.push(`Chasers are down!`);
        return {
            ...state,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                currentState,
                teamIndex,
                currentState.currentPhaseIndex,
                chasersRoundDescription
            ),
        };
    }

    for (const chaser of chasersPlaying) {
        const chaserBonus = chaser.getPlayerBonus();
        const diceRoll = getDiceRoll(chaserBonus);
        chasersRoundDescription.push(`${chaser.getName()} | Roll: ${diceRoll}`);
        let newScores: QuidditchMatchScore;
        if (diceRoll > SUCCESS_MAX) {
            newScores = updateScores(state, { teamPoints: 30 });
            chasersRoundDescription.push(
                `${chaser.getName()} scored 30 points!`
            );
        } else if (diceRoll > PARTIAL_MAX) {
            newScores = updateScores(state, { teamPoints: 20 });
            chasersRoundDescription.push(
                `${chaser.getName()} scored 20 points!`
            );
        } else if (diceRoll > FAILURE_MAX) {
            newScores = updateScores(state, { teamPoints: 10 });
            chasersRoundDescription.push(
                `${chaser.getName()} scored 10 points!`
            );
        } else {
            newScores = updateScores(state, { opponentPoints: 10 });
            chasersRoundDescription.push(`${chaser.getName()} missed!`);
        }
        chaser.resetBonus();
        team.updateTeamPlayerMainTeam(chaser, QuidditchPosition.Chaser);
        currentState.scores = newScores;
    }

    return {
        ...state,
        team1: teamIndex === 1 ? team : state.team1,
        team2: teamIndex === 2 ? team : state.team2,
        currentTeamIndex: teamIndex === 1 ? 2 : 1,
        scores: currentState.scores,
        roundDescriptions: getRoundDescriptionsObjectOnPhase(
            currentState,
            teamIndex,
            currentState.currentPhaseIndex,
            chasersRoundDescription
        ),
    };
};
