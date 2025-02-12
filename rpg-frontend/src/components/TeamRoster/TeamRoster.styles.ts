import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const TeamRosterContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: 'var(--border-radius)',
    padding: '1rem',
    height: '100%',
    maxHeight: '1200px',

    '&[data-team="main"]': {
        order: 1,
    },
    '&[data-team="reserve"]': {
        order: 2,
    },
    '&[data-team="main-reverse"]': {
        order: 2,
    },
    '&[data-team="reserve-reverse"]': {
        order: 1,
    },
});

export const TeamType = styled(Typography)({
    fontWeight: '700 !important',
    borderBottom: '1px solid gray',
});

export const TeamsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
});

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});
