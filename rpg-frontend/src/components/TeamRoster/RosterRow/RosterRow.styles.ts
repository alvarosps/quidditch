import { Box, Paper } from '@mui/material';
import styled from 'styled-components';

export const RosterRowContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
});

export const PlayerChip = styled(Paper)({
    padding: '0.5rem 1rem',
    backgroundColor: '#e3f2fd',
    color: 'inherit',
    borderRadius: 'var(--border-radius)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '&[data-knockedout="true"]': {
        backgroundColor: '#ffebee',
        color: '#d32f2f',
    },
});
