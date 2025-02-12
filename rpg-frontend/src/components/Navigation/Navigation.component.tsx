import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { StyledLink } from './Navigation.styles';

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <StyledLink to="/">
                    <Typography variant="h6">Quidditch Simulator</Typography>
                </StyledLink>
                <StyledLink to="/match">
                    <Button color="inherit">Match</Button>
                </StyledLink>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
