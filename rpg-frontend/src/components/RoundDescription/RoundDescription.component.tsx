import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSimulationContext } from '@providers/SimulationProvider';
import TeamRound from './TeamRound';

interface RoundDescriptionProps {
    descriptionIndex: number;
}

const RoundDescription: React.FC<RoundDescriptionProps> = ({
    descriptionIndex,
}) => {
    const { simulationState } = useSimulationContext();

    // Find the round description corresponding to the current round (assumes roundDescriptions is an array)
    const roundDescriptions = simulationState.roundDescriptions.find(
        (rd) => rd.round === descriptionIndex + 1
    );
    if (!roundDescriptions) return null;

    const { round, team1, team2 } = roundDescriptions;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                my: 2,
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Round: {round}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    width: '100%',
                    gap: 2,
                }}
            >
                {team1 && (
                    <TeamRound
                        teamName={simulationState.team1.getName()}
                        round={round}
                        teamDescriptions={team1}
                        useBorder
                    />
                )}
                {team2 && (
                    <TeamRound
                        teamName={simulationState.team2.getName()}
                        round={round}
                        teamDescriptions={team2}
                    />
                )}
            </Box>
        </Box>
    );
};

export default RoundDescription;
