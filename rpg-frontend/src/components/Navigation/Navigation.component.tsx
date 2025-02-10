import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    margin-right: 16px;
`;

const Navigation: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <StyledLink to="/">
                    <Typography variant="h6">Quidditch Simulator</Typography>
                </StyledLink>
                <StyledLink to="/match">
                    <Button color="inherit">Match</Button>
                </StyledLink>
                {/* Future: Add a Settings link if needed */}
                {/* <StyledLink to="/settings">
          <Button color="inherit">Settings</Button>
        </StyledLink> */}
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
