import React from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TeamAgua } from '@mocks/houses/agua/teamAgua';
import { teamAr } from '@mocks/houses/ar/teamAr';
import { teamFogo } from '@mocks/houses/fogo/teamFogo';
import { teamTerra } from '@mocks/houses/terra/teamTerra';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { useTeamsContext } from '@providers/TeamsProvider';

const teams: QuidditchTeam[] = [TeamAgua, teamAr, teamFogo, teamTerra];

const HeroSection = styled.div`
    background: linear-gradient(
        135deg,
        var(--primary-color),
        var(--secondary-color)
    );
    color: #fff;
    padding: 3rem 1rem;
    text-align: center;
    margin-bottom: 2rem;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const TeamCard = styled(Card)<{ selected: boolean }>`
    cursor: pointer;
    border: ${({ selected }) =>
        selected ? '2px solid var(--secondary-color)' : 'none'};
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
`;

const HomePage: React.FC = () => {
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
                <Typography variant="h5" gutterBottom>
                    Experience the magic and excitement of a real Quidditch
                    match!
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
                                selected={
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
