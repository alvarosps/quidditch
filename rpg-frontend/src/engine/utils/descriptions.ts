import { RoundDescription, SimulationState } from '@_types/Simulation';
import { SIMULATION_STEP_PHASES } from '@constants/quidditch';
import {
    roundDescriptionsDefault,
    roundPhaseToDescriptionType,
    teamRoundDescriptionDefault,
} from '@constants/simulation';
import { QuidditchTeam } from '@engine/QuidditchTeam';

export const getTopOfRoundDescription = (
    round: number,
    team1: QuidditchTeam,
    team2: QuidditchTeam
) => {
    return `Round: ${round} | Score: ${team1.getName()} ${team1.getScore()} - ${team2.getScore()} ${team2.getName()}\n`;
};

export const getRoundDescriptionsObjectOnPhase = (
    state: SimulationState,
    teamIndex: number,
    phaseIndex: number,
    roundDescription: string[]
): RoundDescription[] => {
    const roundDescriptions = [...state.roundDescriptions];
    const currentRound = state.currentRound;
    const teamScore =
        teamIndex === 1 ? state.scores?.team1 || 0 : state.scores?.team2 || 0;

    if (roundDescriptions.length === 0) {
        roundDescriptions.push(roundDescriptionsDefault);
    }

    const currentRoundDescriptionIndex = roundDescriptions.findIndex(
        (rd) => rd.round === currentRound
    );

    const phase = SIMULATION_STEP_PHASES[phaseIndex];
    const descriptionType = roundPhaseToDescriptionType[phase];
    if (currentRoundDescriptionIndex !== -1) {
        roundDescriptions[currentRoundDescriptionIndex] = {
            ...roundDescriptions[currentRoundDescriptionIndex],
            team1:
                teamIndex === 1
                    ? {
                          ...roundDescriptions[currentRoundDescriptionIndex]
                              .team1,
                          [descriptionType]: roundDescription,
                          score: teamScore,
                      }
                    : roundDescriptions[currentRoundDescriptionIndex].team1,
            team2:
                teamIndex === 2
                    ? {
                          ...roundDescriptions[currentRoundDescriptionIndex]
                              .team2,
                          [descriptionType]: roundDescription,
                          score: teamScore,
                      }
                    : roundDescriptions[currentRoundDescriptionIndex].team2,
        };
    } else {
        roundDescriptions.push({
            round: currentRound,
            team1:
                teamIndex === 1
                    ? {
                          ...teamRoundDescriptionDefault,
                          [descriptionType]: roundDescription,
                          score: teamScore,
                      }
                    : teamRoundDescriptionDefault,
            team2:
                teamIndex === 2
                    ? {
                          ...teamRoundDescriptionDefault,
                          [descriptionType]: roundDescription,
                          score: teamScore,
                      }
                    : teamRoundDescriptionDefault,
        });
    }

    return roundDescriptions;
};

export const checkIfIsRollLine = (line: string) => line.includes('Roll:');
export const checkIfWinnerLine = (line: string) =>
    line.includes('caught the snitch');
export const checkIfKnockdownLine = (line: string) =>
    line.includes('knockedown');
