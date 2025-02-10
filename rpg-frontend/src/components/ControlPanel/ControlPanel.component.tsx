// src/components/ControlPanel/ControlPanel.component.tsx
import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import styled from 'styled-components';
import { useSimulationContext } from '@providers/SimulationProvider';

const PanelContainer = styled(Box)`
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
`;

const ControlPanel: React.FC = () => {
    const {
        toggleAutoMode,
        simulateNextRound,
        onPauseToggle,
        isPaused,
        mode,
        matchData,
        resetMatch,
    } = useSimulationContext();

    return (
        <PanelContainer>
            <ButtonGroup variant="contained" color="primary">
                <Button
                    onClick={simulateNextRound}
                    disabled={matchData?.matchEnded}
                >
                    Next Round
                </Button>
                <Button
                    onClick={toggleAutoMode}
                    disabled={matchData?.matchEnded}
                >
                    {mode === 'auto'
                        ? 'Switch to Manual'
                        : 'Switch to Automatic'}
                </Button>
                {mode === 'auto' && (
                    <Button
                        onClick={onPauseToggle}
                        disabled={matchData?.matchEnded}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                )}
                <Button onClick={resetMatch} disabled={!matchData?.matchEnded}>
                    Restart Match
                </Button>
            </ButtonGroup>
        </PanelContainer>
    );
};

export default ControlPanel;
