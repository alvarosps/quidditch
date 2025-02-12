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
import PlayerManagement from '@components/PlayerManagement';
import { Section } from './TeamManagementPage.styles';
import { useTeamManagement } from './hooks';

const TeamManagementPage = () => {
    const { teamToManage: team } = useTeamsContext();
    if (!team) return null;

    const {
        crowdModifier,
        handleCrowdModifierChange,
        players,
        handleNameChange,
        handleModifierChange,
        handleMainTeamToggle,
        handleIsPlayingToggle,
        error,
        errorMessage,
        saveChanges,
    } = useTeamManagement(team);

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
                const mainPlayers = players[position].filter(
                    (p) => p.getIsMainTeam() || p.getIsPlaying()
                );
                const reservePlayers = players[position].filter(
                    (p) => !p.getIsMainTeam() && !p.getIsPlaying()
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
