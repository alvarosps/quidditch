import { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useSimulationContext } from '@providers/SimulationProvider';

import { BoardContainer, LogControls } from './MatchBoard.styles';
import RoundDescription from '@components/RoundDescription';

const MatchBoard = () => {
    const { simulationState, clearDescription, simulationMode } =
        useSimulationContext();
    const [descriptionIndex, setDescriptionIndex] = useState(
        simulationState.roundDescriptions.length - 1
    );

    useEffect(() => {
        setDescriptionIndex(simulationState.roundDescriptions.length - 1);
    }, [simulationState.roundDescriptions]);
    return (
        <BoardContainer>
            <Box mt={2}>
                {simulationState.roundDescriptions.length === 0 && (
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                        Match has not started yet
                    </Typography>
                )}
                <RoundDescription descriptionIndex={descriptionIndex} />
            </Box>
            <LogControls>
                <Button
                    variant="outlined"
                    onClick={clearDescription}
                    disabled={
                        simulationMode === 'auto' ||
                        simulationState.roundDescriptions.length === 0
                    }
                >
                    Clear Log
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => setDescriptionIndex(descriptionIndex - 1)}
                    disabled={
                        descriptionIndex === 0 ||
                        simulationState.roundDescriptions.length === 0
                    }
                >
                    Previous Round Log
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => setDescriptionIndex(descriptionIndex + 1)}
                    disabled={
                        descriptionIndex ===
                        simulationState.roundDescriptions.length - 1
                    }
                >
                    Next Round Log
                </Button>
            </LogControls>
        </BoardContainer>
    );
};

export default MatchBoard;
