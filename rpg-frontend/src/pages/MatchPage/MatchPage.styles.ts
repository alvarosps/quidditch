import { Container, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

export const Header = styled(Typography)({
    textAlign: 'center',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

export const RoastersContainer = styled(Grid)({
    marginTop: '2rem',
    marginBottom: '2rem',
});

export const WinnerRow = styled.span({
    color: 'green',
    fontWeight: 700,
});

export const TeamsHeaderContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
});

export const HeaderContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

export const ContainerElement = styled(Container)({
    maxWidth: '100% !important',
    width: '100% !important',
});
