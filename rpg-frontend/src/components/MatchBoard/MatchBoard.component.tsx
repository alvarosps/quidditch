// src/components/MatchBoard/MatchBoard.component.tsx
import React, { useEffect, useRef } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';
import { useSimulationContext } from '@providers/SimulationProvider';
import styled from 'styled-components';

const BoardContainer = styled(Paper)`
    padding: 1.5rem;
    height: 350px;
    overflow-y: auto;
    margin-bottom: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;

const LogControls = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const MatchBoard: React.FC = () => {
    const { round, score, description, setDescription, matchData } =
        useSimulationContext();
    const boardRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (boardRef.current) {
            boardRef.current.scrollTop = boardRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [description]);

    return (
        <BoardContainer ref={boardRef}>
            {matchData?.matchEnded && (
                <Typography variant="h5" color="error" gutterBottom>
                    Match Ended!
                </Typography>
            )}
            <Typography variant="subtitle1">
                Round: {round} | Score: {score.team1} - {score.team2}
            </Typography>
            <Box mt={2}>
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                    {description}
                </Typography>
            </Box>
            <LogControls>
                <Button variant="outlined" onClick={() => setDescription('')}>
                    Clear Log
                </Button>
                <Button variant="outlined" onClick={scrollToBottom}>
                    Scroll to Bottom
                </Button>
            </LogControls>
        </BoardContainer>
    );
};

export default MatchBoard;
