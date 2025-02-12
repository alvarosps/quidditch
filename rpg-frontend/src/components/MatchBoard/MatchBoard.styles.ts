import { Box, Paper } from '@mui/material';
import styled from 'styled-components';

export const BoardContainer = styled(Paper)({
    padding: '1.5rem',
    height: '700px',
    overflowY: 'auto',
    marginBottom: '1.5rem',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
});

export const LogControls = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
});
