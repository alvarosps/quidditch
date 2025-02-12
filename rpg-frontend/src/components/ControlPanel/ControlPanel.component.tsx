import { Button, ButtonGroup } from '@mui/material';
import { useSimulationContext } from '@providers/SimulationProvider';
import { PanelContainer } from './ControlPanel.styles';

const ControlPanel: React.FC = () => {
    const {
        toggleAutoMode,
        simulateNextRound,
        onPauseToggle,
        isPaused,
        simulationMode,
        resetMatch,
        simulationState,
    } = useSimulationContext();

    return (
        <PanelContainer>
            <ButtonGroup variant="contained" color="primary">
                <Button
                    onClick={() => simulateNextRound()}
                    disabled={simulationState.matchEnded}
                >
                    {simulationState.currentRound === 1
                        ? 'Start Match'
                        : 'Next Round'}
                </Button>
                <Button
                    onClick={toggleAutoMode}
                    disabled={simulationState.matchEnded}
                >
                    {simulationMode === 'auto'
                        ? 'Switch to Manual'
                        : 'Switch to Automatic'}
                </Button>
                {simulationMode === 'auto' && (
                    <Button
                        onClick={onPauseToggle}
                        disabled={simulationState.matchEnded}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                )}
                <Button onClick={resetMatch}>Restart Match</Button>
            </ButtonGroup>
        </PanelContainer>
    );
};

export default ControlPanel;
