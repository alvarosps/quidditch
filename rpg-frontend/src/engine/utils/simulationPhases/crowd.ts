import { SimulationResult, SimulationState } from '@_types/Simulation';
import {
    FAILURE_MAX,
    PARTIAL_MAX,
    QuidditchPosition,
} from '@constants/quidditch';
import { getDiceRoll } from '@utils/diceRoll';
import { getRoundDescriptionsObjectOnPhase } from '../descriptions';
import { choosePositionRandomly } from '../quidditchPlayers';

export const crowdsPhase = (
    state: SimulationState,
    userInput?: QuidditchPosition[]
): SimulationResult => {
    if (state.currentTeamIndex === 1) {
        const team1Phase = teamCrowdRound(state, 1, userInput);
        if (team1Phase.userInputRequired) {
            return team1Phase;
        }
        const team2Phase = teamCrowdRound(team1Phase.newState, 2, userInput);
        if (team2Phase.userInputRequired) {
            return team2Phase;
        }
        const countdown = team2Phase.newState.teamSeekersKnockedOut
            ? team2Phase.newState.countdownAfterTeamSeekersAreKnockedOut - 1
            : team2Phase.newState.countdownAfterTeamSeekersAreKnockedOut;

        const team1SeekersPlaying =
            team2Phase.newState.team1.teamHasSeekerPlaying();
        const team2SeekersPlaying =
            team2Phase.newState.team2.teamHasSeekerPlaying();

        return {
            newState: {
                ...team2Phase.newState,
                currentPhaseIndex: 0,
                currentTeamIndex: 1,
                currentRound: state.currentRound + 1,
                countdownAfterTeamSeekersAreKnockedOut: countdown,
                teamSeekersKnockedOut:
                    !team1SeekersPlaying || !team2SeekersPlaying,
                matchEnded:
                    countdown === 0 ||
                    (!team1SeekersPlaying && !team2SeekersPlaying),
            },
        };
    } else {
        const team2Phase = teamCrowdRound(state, 2, userInput);
        if (team2Phase.userInputRequired) {
            team2Phase;
        }
        const countdown = team2Phase.newState.teamSeekersKnockedOut
            ? team2Phase.newState.countdownAfterTeamSeekersAreKnockedOut - 1
            : team2Phase.newState.countdownAfterTeamSeekersAreKnockedOut;

        const team1SeekersPlaying =
            team2Phase.newState.team1.teamHasSeekerPlaying();
        const team2SeekersPlaying =
            team2Phase.newState.team2.teamHasSeekerPlaying();
        return {
            newState: {
                ...team2Phase.newState,
                currentPhaseIndex: 0,
                currentTeamIndex: 1,
                currentRound: state.currentRound + 1,
                countdownAfterTeamSeekersAreKnockedOut: countdown,
                teamSeekersKnockedOut:
                    !team1SeekersPlaying || !team2SeekersPlaying,
                matchEnded:
                    countdown === 0 ||
                    (!team1SeekersPlaying && !team2SeekersPlaying),
            },
        };
    }
};

const teamCrowdRound = (
    state: SimulationState,
    teamIndex: number,
    userInput?: QuidditchPosition[]
): SimulationResult => {
    const currentState = { ...state };
    const team = teamIndex === 1 ? currentState.team1 : currentState.team2;
    let diceRoll: number;

    if (userInput) {
        diceRoll = currentState.lastRoll;
    } else {
        const crowdBonus = team.getCrowdModifier();
        diceRoll = getDiceRoll(crowdBonus);
    }

    if (currentState.manualMode.crowd && diceRoll > FAILURE_MAX && !userInput) {
        return {
            newState: {
                ...currentState,
                description: `${currentState.description}`,
                lastRoll: diceRoll,
                currentTeamIndex: teamIndex === 1 ? 2 : 1,
            },
            userInputRequired: true,
            typeOfInput: 'crowd',
        };
    }
    const crowdsRoundDescription = [];
    crowdsRoundDescription.push(`Crowd | Roll: ${diceRoll}`);
    let [position1, position2] = userInput || [
        choosePositionRandomly(currentState),
        choosePositionRandomly(currentState),
    ];
    if (position2 === position1) {
        while (position2 === position1) {
            position2 = choosePositionRandomly(currentState);
        }
    }

    if (diceRoll > PARTIAL_MAX) {
        if (position1) {
            team.updateCrowdBonus(position1);
        }
        if (position2) {
            team.updateCrowdBonus(position2);
        }
        if (position1 && position2) {
            crowdsRoundDescription.push(
                `${position1} and ${position2} received crowd bonus!`
            );
        }
    } else if (diceRoll > FAILURE_MAX) {
        if (position1) {
            team.updateCrowdBonus(position1);
            crowdsRoundDescription.push(`${position1} received crowd bonus!`);
        }
    } else {
        if (position1) {
            team.updateCrowdBonus(position1, -2);
            crowdsRoundDescription.push(`${position1} received crowd penalty!`);
        }
    }

    return {
        newState: {
            ...currentState,
            lastRoll: diceRoll,
            currentTeamIndex: teamIndex === 1 ? 2 : 1,
            team1: teamIndex === 1 ? team : currentState.team1,
            team2: teamIndex === 2 ? team : currentState.team2,
            roundDescriptions: getRoundDescriptionsObjectOnPhase(
                currentState,
                teamIndex,
                currentState.currentPhaseIndex,
                crowdsRoundDescription
            ),
        },
    };
};
