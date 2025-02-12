import {
    Paper,
    TextField,
    Checkbox,
    FormControlLabel,
    Grid,
} from '@mui/material';
import { QuidditchPlayer } from '@models/QuidditchPlayer';

interface PlayerManagementProps {
    player: QuidditchPlayer;
    onNameChange: (player: QuidditchPlayer, name: string) => void;
    onModifierChange: (player: QuidditchPlayer, value: number) => void;
    onMainTeamToggle: (player: QuidditchPlayer) => void;
    onIsPlayingToggle: (player: QuidditchPlayer) => void;
}

const PlayerManagement = ({
    player,
    onNameChange,
    onModifierChange,
    onMainTeamToggle,
    onIsPlayingToggle,
}: PlayerManagementProps) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4} style={{ paddingLeft: '8px' }}>
                    <TextField
                        label="Player Name"
                        value={player.getName()}
                        onChange={(e) => onNameChange(player, e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Modifier"
                        type="number"
                        value={player.getModifier()}
                        onChange={(e) =>
                            onModifierChange(player, Number(e.target.value))
                        }
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={player.getIsMainTeam()}
                                onChange={() => onMainTeamToggle(player)}
                                color="primary"
                            />
                        }
                        label="Main Team"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={player.getIsPlaying()}
                                onChange={() => onIsPlayingToggle(player)}
                                color="primary"
                            />
                        }
                        label="Playing"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PlayerManagement;
