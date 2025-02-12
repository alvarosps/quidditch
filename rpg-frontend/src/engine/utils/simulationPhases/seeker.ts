import { QuidditchMatchScore } from '@_types/Quidditch';
import { SimulationResult, SimulationState } from '@_types/Simulation';
import {
    CATCH_SNITCH_MIN,
    FAILURE_MAX,
    PARTIAL_MAX,
    QuidditchPosition,
} from '@constants/quidditch';
import { Seeker } from '@models/QuidditchPositions';
import { getDiceRoll } from '@utils/diceRoll';
import { updateScores } from '../simulation';
import { getRoundDescriptionsObjectOnPhase } from '../descriptions';

export const seekersPhase = (state: SimulationState): SimulationResult => {
    let seekerPriority = state.seekerPriority;
    if (!seekerPriority) {
        const roll = getDiceRoll();
        seekerPriority =
            roll > 6 ? state.team1.getName() : state.team2.getName();
    }
    let seekerTeam1Roll: number;
    let seekerTeam2Roll: number;
    let simulationResult: SimulationState;
    if (seekerPriority === state.team1.getName()) {
        const team1Phase = teamSeekerRound(state, 1);
        seekerTeam1Roll = team1Phase.lastRoll;
        if (team1Phase.snitchCaught) {
            simulationResult = {
                ...team1Phase,
                matchEnded: true,
                stopPhase: false,
            };
        } else if (team1Phase.stopPhase) {
            simulationResult = {
                ...team1Phase,
                stopPhase: false,
                currentTeamIndex: 1,
            };
        } else {
            const team2Phase = teamSeekerRound(team1Phase, 2);
            seekerTeam2Roll = team2Phase.lastRoll;
            simulationResult = {
                ...team2Phase,
                matchEnded: team2Phase.snitchCaught,
                stopPhase: false,
            };
        }
    } else {
        const team2Phase = teamSeekerRound(state, 2);
        seekerTeam2Roll = team2Phase.lastRoll;
        if (team2Phase.snitchCaught) {
            simulationResult = {
                ...team2Phase,
                matchEnded: true,
                stopPhase: false,
            };
        } else if (team2Phase.stopPhase) {
            simulationResult = {
                ...team2Phase,
                stopPhase: false,
                currentTeamIndex: 2,
            };
        } else {
            const team1Phase = teamSeekerRound(team2Phase, 1);
            seekerTeam1Roll = team1Phase.lastRoll;

            simulationResult = {
                ...team1Phase,
                matchEnded: team2Phase.snitchCaught,
                stopPhase: false,
                currentTeamIndex: 1,
            };
        }
    }

    return {
        newState: {
            ...simulationResult,
            seekerPriority:
                seekerTeam1Roll > seekerTeam2Roll
                    ? state.team1.getName()
                    : state.team2.getName(),
            currentPhaseIndex: state.currentPhaseIndex + 1,
        },
    };
};

const teamSeekerRound = (
    state: SimulationState,
    teamIndex: number
): SimulationState => {
    const currentState = { ...state };
    const team = teamIndex === 1 ? currentState.team1 : currentState.team2;

    const seekerPlaying = team.getMainTeam().Seeker;

    const seekersRoundDescription = [];

    if (
        !seekerPlaying ||
        !seekerPlaying.getIsPlaying() ||
        seekerPlaying.getKnockedOut()
    ) {
        seekersRoundDescription.push(`Seeker is down!`);
        return {
            ...currentState,
            teamSeekersKnockedOut: true,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                currentState,
                teamIndex,
                currentState.currentPhaseIndex,
                seekersRoundDescription
            ),
        };
    }

    const seekerBonus = seekerPlaying.getPlayerBonus();
    const diceRoll = getDiceRoll(seekerBonus);

    seekersRoundDescription.push(
        `${seekerPlaying.getName()} | Roll: ${diceRoll}`
    );

    if (!currentState.snitchSpotted) {
        const snitchSpotted = diceRoll > PARTIAL_MAX;
        if (snitchSpotted) {
            seekersRoundDescription.push(
                `${seekerPlaying.getName()} spotted the snitch!`
            );
        }
        return {
            ...currentState,
            snitchSpotted,
            stopPhase: snitchSpotted,
            lastRoll: diceRoll,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                currentState,
                teamIndex,
                currentState.currentPhaseIndex,
                seekersRoundDescription
            ),
        };
    }
    let snitchCaught = false;
    let newScores: QuidditchMatchScore = { ...state.scores };

    if (diceRoll >= CATCH_SNITCH_MIN) {
        if (team.checkIfSeekerCanCatchSnitch()) {
            snitchCaught = true;
            newScores = updateScores(state, { teamPoints: 50 });
            seekersRoundDescription.push(
                `${seekerPlaying.getName()} caught the snitch, scoring 50 points and ending the match!!`
            );
        } else {
            seekerPlaying.setForward(3);
            seekersRoundDescription.push(
                `${seekerPlaying.getName()} is close to the snitch!`
            );
        }
    } else if (diceRoll > PARTIAL_MAX) {
        seekerPlaying.setForward(2);
        seekersRoundDescription.push(
            `${seekerPlaying.getName()} is getting closer to the snitch!`
        );
    } else if (diceRoll > FAILURE_MAX) {
        seekerPlaying.setForward(1);
        seekersRoundDescription.push(
            `${seekerPlaying.getName()} is trying to get closer to the snitch!`
        );
    } else {
        seekerPlaying.setForward(-2);
        seekersRoundDescription.push(
            `\t\t${seekerPlaying.getName()} is moving away from the snitch!`
        );
    }

    seekerPlaying.resetBonus();
    team.updateTeamPlayerMainTeam(seekerPlaying, QuidditchPosition.Seeker);

    return {
        ...state,
        team1: teamIndex === 1 ? team : state.team1,
        team2: teamIndex === 2 ? team : state.team2,
        snitchCaught,
        matchEnded: snitchCaught,
        stopPhase: snitchCaught,
        lastRoll: diceRoll,
        currentTeamIndex: teamIndex === 1 ? 2 : 1,
        scores: newScores,
        roundDescriptions: getRoundDescriptionsObjectOnPhase(
            currentState,
            teamIndex,
            currentState.currentPhaseIndex,
            seekersRoundDescription
        ),
    };
};

export const incrementSeekersRoundBonus = (state: SimulationState) => {
    const team1 = state.team1;
    const team2 = state.team2;

    const seeker1 = team1.getMainTeam().Seeker;
    const seeker2 = team2.getMainTeam().Seeker;

    if (seeker1) {
        (seeker1 as Seeker).incrementRoundBonus();
        team1.updateTeamPlayerMainTeam(seeker1, QuidditchPosition.Seeker);
    }

    if (seeker2) {
        (seeker2 as Seeker).incrementRoundBonus();
        team2.updateTeamPlayerMainTeam(seeker2, QuidditchPosition.Seeker);
    }
    return {
        ...state,
        team1,
        team2,
    };
};
