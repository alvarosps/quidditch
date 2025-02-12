import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { TeamRoundDescription } from '@_types/Simulation';
import { PhaseTitle } from './TeamRound.styles';
import {
    checkIfIsRollLine,
    checkIfKnockdownLine,
    checkIfWinnerLine,
} from '@engine/utils/descriptions';

interface TeamRoundProps {
    teamName: string;
    round: number;
    teamDescriptions: TeamRoundDescription;
    useBorder?: boolean;
}

const TeamRound: React.FC<TeamRoundProps> = ({
    teamName,
    round,
    teamDescriptions,
    useBorder,
}) => {
    const {
        chasersRoundDescription,
        beatersRoundDescription,
        keepersRoundDescription,
        seekersRoundDescription,
        crowdsRoundDescription,
        score,
    } = teamDescriptions;

    return (
        <Paper
            sx={{
                p: 2,
                width: '100%',
                maxWidth: '45%',
                borderRight: useBorder ? '1px solid gray' : 'none',
                boxShadow: 3,
            }}
        >
            <Typography variant="h6" align="center">
                {teamName}
            </Typography>
            <Typography variant="subtitle1" align="center">
                Score: {score}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ mt: 1 }}>
                <PhaseTitle variant="subtitle2">Chaser's Round</PhaseTitle>
                {chasersRoundDescription.map((desc, index) => (
                    <Typography
                        key={`chaser-${round}-${index}`}
                        variant="body2"
                        style={{
                            textAlign: checkIfIsRollLine(desc)
                                ? 'center'
                                : 'left',
                        }}
                    >
                        {desc}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ mt: 1 }}>
                <PhaseTitle variant="subtitle2">Beater's Round</PhaseTitle>
                {beatersRoundDescription.map((desc, index) => (
                    <Typography
                        key={`beater-${round}-${index}`}
                        variant="body2"
                        style={{
                            textAlign: checkIfIsRollLine(desc)
                                ? 'center'
                                : 'left',
                            color: checkIfKnockdownLine(desc)
                                ? 'red'
                                : 'inherit',
                        }}
                    >
                        {desc}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ mt: 1 }}>
                <PhaseTitle variant="subtitle2">Keeper's Round</PhaseTitle>
                {keepersRoundDescription.map((desc, index) => (
                    <Typography
                        key={`keeper-${round}-${index}`}
                        variant="body2"
                        style={{
                            textAlign: checkIfIsRollLine(desc)
                                ? 'center'
                                : 'left',
                        }}
                    >
                        {desc}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ mt: 1 }}>
                <PhaseTitle variant="subtitle2">Seeker's Round</PhaseTitle>
                {seekersRoundDescription.map((desc, index) => (
                    <Typography
                        key={`seeker-${round}-${index}`}
                        variant="body2"
                        style={{
                            textAlign: checkIfIsRollLine(desc)
                                ? 'center'
                                : 'left',
                            color: checkIfWinnerLine(desc)
                                ? 'green'
                                : 'inherit',
                        }}
                    >
                        {desc}
                    </Typography>
                ))}
                {seekersRoundDescription.length === 0 && (
                    <Typography
                        variant="body2"
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        -
                    </Typography>
                )}
            </Box>
            {crowdsRoundDescription.length > 0 && (
                <Box sx={{ mt: 1 }}>
                    <PhaseTitle variant="subtitle2">Crowd's Round</PhaseTitle>
                    {crowdsRoundDescription.map((desc, index) => (
                        <Typography
                            key={`crowd-${round}-${index}`}
                            variant="body2"
                            style={{
                                textAlign: checkIfIsRollLine(desc)
                                    ? 'center'
                                    : 'left',
                            }}
                        >
                            {desc}
                        </Typography>
                    ))}
                </Box>
            )}
        </Paper>
    );
};

export default TeamRound;
