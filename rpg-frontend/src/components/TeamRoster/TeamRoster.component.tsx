// src/components/TeamRoster/TeamRoster.component.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchPlayer } from '@models/QuidditchPlayer';
import styled from 'styled-components';

// A container for each row of players
const RosterRow = styled(Box)`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
`;

const PlayerChip = styled(Paper)({
    padding: '0.5rem 1rem',
    backgroundColor: '#e3f2fd',
    color: 'inherit',
    borderRadius: 'var(--border-radius)',

    '&[data-knockedout="true"]': {
        backgroundColor: '#ffebee',
        color: '#d32f2f',
    },
});

// A helper component to render a row given a label and an array of players.
interface RosterRowProps {
    label: string;
    players: QuidditchPlayer[];
}
const RosterRowComponent: React.FC<RosterRowProps> = ({ label, players }) => (
    <Box mb={1}>
        <Typography variant="subtitle1">{label}:</Typography>
        <RosterRow>
            {players.map((player) => (
                <PlayerChip
                    key={player.getName()}
                    data-knockedout={!player.getKnockedOut()}
                >
                    {player.getName()} | modifier: {player.getModifier()}
                </PlayerChip>
            ))}
        </RosterRow>
    </Box>
);

interface TeamRosterProps {
    team: QuidditchTeam;
}
const TeamRoster: React.FC<TeamRosterProps> = ({ team }) => {
    const mainTeam = team.getMainTeam();
    const reserveTeam = team.getReserveTeam();

    // For positions that are stored as single player (Keeper and Seeker) convert them to arrays.
    const mainKeeper = mainTeam.Keeper ? [mainTeam.Keeper] : [];
    const mainSeeker = mainTeam.Seeker ? [mainTeam.Seeker] : [];
    const reserveKeeper = reserveTeam.Keeper ? [reserveTeam.Keeper] : [];
    const reserveSeeker = reserveTeam.Seeker ? [reserveTeam.Seeker] : [];

    return (
        <Box>
            <Typography variant="h6" align="center" gutterBottom>
                {team.getName()}
            </Typography>

            <Box mb={2}>
                <Typography variant="subtitle1">Main Team</Typography>
                <RosterRowComponent label="Chasers" players={mainTeam.Chaser} />
                <RosterRowComponent label="Beaters" players={mainTeam.Beater} />
                <RosterRowComponent label="Keeper" players={mainKeeper} />
                <RosterRowComponent label="Seeker" players={mainSeeker} />
            </Box>

            <Box>
                <Typography variant="subtitle1">Reserve Team</Typography>
                <RosterRowComponent
                    label="Chasers"
                    players={reserveTeam.Chaser}
                />
                <RosterRowComponent
                    label="Beaters"
                    players={reserveTeam.Beater}
                />
                <RosterRowComponent label="Keeper" players={reserveKeeper} />
                <RosterRowComponent label="Seeker" players={reserveSeeker} />
            </Box>
        </Box>
    );
};

export default TeamRoster;
