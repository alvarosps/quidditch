// src/pages/TeamManagementPage/TeamManagementPage.component.tsx
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Grid,
} from '@mui/material';
import { useTeamsContext } from '@providers/TeamsProvider';
import { QuidditchTeamPlayers } from '@_types/Quidditch';
import { QuidditchPlayer } from '@models/QuidditchPlayer';
import PlayerManagement from '@components/PlayerManagement';
import styled from 'styled-components';
import { Beater, Chaser, Keeper, Seeker } from '@models/QuidditchPositions';

const Section = styled(Box)`
    margin-bottom: 2rem;
`;

const TeamManagementPage: React.FC = () => {
    const { teamToManage: team } = useTeamsContext();
    if (!team) return null;

    const [crowdModifier, setCrowdModifier] = useState<number>(
        team.getCrowdModifier()
    );
    const [players, setPlayers] = useState<QuidditchTeamPlayers>(
        team.getPlayers()
    );
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCrowdModifierChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCrowdModifier(Number(e.target.value));
    };

    const updatePlayersState = (player: QuidditchPlayer) => {
        const updatedPlayers = { ...players };
        if (player instanceof Seeker) {
            updatedPlayers.Seeker = players.Seeker.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        } else if (player instanceof Beater) {
            updatedPlayers.Beater = players.Beater.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        } else if (player instanceof Chaser) {
            updatedPlayers.Chaser = players.Chaser.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        } else if (player instanceof Keeper) {
            updatedPlayers.Keeper = players.Keeper.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        }
        setPlayers(updatedPlayers);
    };

    // Handlers passed to the PlayerManagement component:
    const handleNameChange = (player: QuidditchPlayer, name: string) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setName(name); // Make sure your QuidditchPlayer has a setName method
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const handleModifierChange = (player: QuidditchPlayer, value: number) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setModifier(value);
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const handleMainTeamToggle = (player: QuidditchPlayer) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setIsMainTeam(!player.getIsMainTeam());
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const handleIsPlayingToggle = (player: QuidditchPlayer) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setIsPlaying(!player.getIsPlaying());
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const saveChanges = () => {
        team.setCrowdModifier(crowdModifier);
        team.setMainTeam({
            Chaser: players.Chaser.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ),
            Beater: players.Beater.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ),
            Keeper: players.Keeper.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            )[0],
            Seeker: players.Seeker.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            )[0],
        });

        alert('Changes saved successfully!');
    };

    useEffect(() => {
        const mainTeamCounts = {
            Chaser: players.Chaser.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ).length,
            Beater: players.Beater.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ).length,
            Keeper: players.Keeper.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ).length,
            Seeker: players.Seeker.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ).length,
        };

        if (
            mainTeamCounts.Chaser !== 3 ||
            mainTeamCounts.Beater !== 2 ||
            mainTeamCounts.Keeper !== 1 ||
            mainTeamCounts.Seeker !== 1
        ) {
            setError(true);
            setErrorMessage(
                'Invalid number of players in the main team for one or more positions.'
            );
        } else {
            setError(false);
            setErrorMessage('');
        }
    }, [players]);

    return (
        <Container>
            <Section>
                <Typography variant="h4" gutterBottom>
                    Manage Team: {team.getName()}
                </Typography>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <TextField
                        label="Crowd Modifier"
                        type="number"
                        value={crowdModifier}
                        onChange={handleCrowdModifierChange}
                        fullWidth
                    />
                </Paper>
            </Section>

            {/* For each position, split into main and reserve columns */}
            {Object.keys(players).map((positionKey) => {
                const position = positionKey as keyof QuidditchTeamPlayers;
                const mainPlayers = players[position].filter((p) =>
                    p.getIsMainTeam()
                );
                const reservePlayers = players[position].filter(
                    (p) => !p.getIsMainTeam()
                );
                return (
                    <Section key={position}>
                        <Typography variant="h5" gutterBottom>
                            {position}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Main Team
                                </Typography>
                                {mainPlayers.map((player) => (
                                    <PlayerManagement
                                        key={player.getName()}
                                        player={player}
                                        onNameChange={handleNameChange}
                                        onModifierChange={handleModifierChange}
                                        onMainTeamToggle={handleMainTeamToggle}
                                        onIsPlayingToggle={
                                            handleIsPlayingToggle
                                        }
                                    />
                                ))}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Reserve Team
                                </Typography>
                                {reservePlayers.map((player) => (
                                    <PlayerManagement
                                        key={player.getName()}
                                        player={player}
                                        onNameChange={handleNameChange}
                                        onModifierChange={handleModifierChange}
                                        onMainTeamToggle={handleMainTeamToggle}
                                        onIsPlayingToggle={
                                            handleIsPlayingToggle
                                        }
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </Section>
                );
            })}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                {error && (
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{ color: 'red' }}
                    >
                        {errorMessage}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveChanges}
                    disabled={error}
                >
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
};

export default TeamManagementPage;
