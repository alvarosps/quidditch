import { Card } from '@mui/material';
import styled from 'styled-components';

export const HeroSection = styled.div({
    background:
        'linear-gradient(135deg,var(--primary-color),var(--secondary-color))',
    color: '#fff',
    padding: '3rem 1rem',
    textAlign: 'center',
    marginBottom: '2rem',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
});

export const TeamCard = styled(Card)({
    cursor: 'pointer',
    border: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },

    '&[data-selected="true"]': {
        border: '2px solid var(--secondary-color)',
    },
});
