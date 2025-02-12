import { useState } from 'react';
import {
    Box,
    FormControlLabel,
    Switch,
    Slider,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useSimulationContext } from '@providers/SimulationProvider';
import styled from 'styled-components';
import { ControlsContainer } from './SimulationControls.styles';

const SimulationControls = () => {
    const {
        simulationMode,
        setSimulationMode,
        roundInterval,
        setRoundInterval,
        manualKnockdown,
        setManualKnockdown,
        manualCrowd,
        setManualCrowd,
        isPaused,
    } = useSimulationContext();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingMode, setPendingMode] = useState<
        'auto' | 'roundByRound' | null
    >(null);

    const handleModeChange = (newMode: 'auto' | 'roundByRound') => {
        if (
            simulationMode === 'roundByRound' &&
            newMode === 'auto' &&
            !isPaused
        ) {
            setPendingMode(newMode);
            setConfirmOpen(true);
        } else {
            setSimulationMode(newMode);
        }
    };

    const handleConfirmModeSwitch = () => {
        if (pendingMode) {
            setSimulationMode(pendingMode);
            setConfirmOpen(false);
            setPendingMode(null);
        }
    };

    return (
        <ControlsContainer>
            <Typography variant="h6" gutterBottom>
                Simulation Settings
            </Typography>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <FormControlLabel
                    control={
                        <Switch
                            checked={simulationMode === 'auto'}
                            onChange={(e) =>
                                handleModeChange(
                                    e.target.checked ? 'auto' : 'roundByRound'
                                )
                            }
                            name="modeSwitch"
                            color="primary"
                        />
                    }
                    label={
                        simulationMode === 'auto'
                            ? 'Auto Mode'
                            : 'Round-by-Round Mode'
                    }
                />

                <Box width={200}>
                    <Typography id="round-interval-slider" gutterBottom>
                        Round Interval (ms): {roundInterval}
                    </Typography>
                    <Slider
                        value={roundInterval}
                        onChange={(e, value) =>
                            setRoundInterval(value as number)
                        }
                        aria-labelledby="round-interval-slider"
                        step={100}
                        min={0}
                        max={3000}
                        valueLabelDisplay="auto"
                    />
                </Box>

                <FormControlLabel
                    control={
                        <Switch
                            checked={manualKnockdown}
                            onChange={(e) =>
                                setManualKnockdown(e.target.checked)
                            }
                            name="manualKnockdownSwitch"
                            color="primary"
                        />
                    }
                    label="Manual Knockdown"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={manualCrowd}
                            onChange={(e) => setManualCrowd(e.target.checked)}
                            name="manualCrowdSwitch"
                            color="primary"
                        />
                    }
                    label="Manual Crowd Cheers"
                />
            </Box>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Mode Change</DialogTitle>
                <DialogContent>
                    <Typography>
                        Switching from round-by-round mode to auto mode while
                        the simulation is running may cause the current round to
                        finish automatically. Do you want to continue?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmModeSwitch} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </ControlsContainer>
    );
};

export default SimulationControls;
