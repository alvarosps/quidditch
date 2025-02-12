import {
    Container,
    Grid,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TeamAgua } from '@mocks/houses/agua/teamAgua';
import { teamAr } from '@mocks/houses/ar/teamAr';
import { teamFogo } from '@mocks/houses/fogo/teamFogo';
import { teamTerra } from '@mocks/houses/terra/teamTerra';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { useTeamsContext } from '@providers/TeamsProvider';
import { HeroSection, TeamCard } from './HomePage.styles';

const teams: QuidditchTeam[] = [TeamAgua, teamAr, teamFogo, teamTerra];

const HomePage = () => {
    const { selectedTeams, setSelectedTeams, setTeamToManage } =
        useTeamsContext();
    const navigate = useNavigate();

    const toggleTeamSelection = (team: QuidditchTeam) => {
        const exists = selectedTeams.find(
            (t) => t.getName() === team.getName()
        );
        let updatedSelection: QuidditchTeam[];
        if (exists) {
            updatedSelection = selectedTeams.filter(
                (t) => t.getName() !== team.getName()
            );
        } else if (selectedTeams.length < 2) {
            updatedSelection = [...selectedTeams, team];
        } else {
            updatedSelection = selectedTeams;
        }
        setSelectedTeams(updatedSelection);
    };

    const startMatch = () => {
        if (selectedTeams.length === 2) {
            navigate('/match');
        }
    };

    const manageTeam = (team: QuidditchTeam) => {
        setTeamToManage(team);
        navigate('/manage-team');
    };

    return (
        <>
            <HeroSection>
                <Typography variant="h2" component="h1" gutterBottom>
                    CasteloBruxo Quidditch Simulator
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={startMatch}
                    disabled={selectedTeams.length !== 2}
                >
                    Start Match
                </Button>
            </HeroSection>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Select Two Teams for the Match
                </Typography>
                <Grid container spacing={3}>
                    {teams.map((team) => (
                        <Grid item xs={12} sm={6} md={3} key={team.getName()}>
                            <TeamCard
                                data-selected={
                                    !!selectedTeams.find(
                                        (t) => t.getName() === team.getName()
                                    )
                                }
                                onClick={() => toggleTeamSelection(team)}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {team.getName()}
                                    </Typography>
                                    <Typography variant="body2">
                                        Crowd Modifier:{' '}
                                        {team.getCrowdModifier()}
                                    </Typography>
                                </CardContent>
                            </TeamCard>
                            <Button
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: '0.5rem' }}
                                onClick={() => manageTeam(team)}
                            >
                                Manage Team
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;
