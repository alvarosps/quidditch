// src/pages/MatchPage/MatchPage.component.tsx
import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MatchBoard from '@components/MatchBoard';
import ControlPanel from '@components/ControlPanel';
import SimulationControls from '@components/SimulationControls';
import { useSimulationContext } from '@providers/SimulationProvider';
import { useTeamsContext } from '@providers/TeamsProvider';
import styled from 'styled-components';
import { QuidditchMatch } from '@engine/QuidditchMatch';
import TeamRoster from '@components/TeamRoster';

const Header = styled(Typography)`
    text-align: center;
    margin-bottom: 1rem;
`;

const RostersContainer = styled(Grid)`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const MatchPage: React.FC = () => {
    const {
        setMatch,
        onRequestKnockdown,
        onRequestCrowdCheer,
        mode,
        manualKnockdown,
        manualCrowd,
    } = useSimulationContext();

    const { selectedTeams: teams } = useTeamsContext();

    useEffect(() => {
        if (teams && teams.length === 2) {
            const newMatch = new QuidditchMatch(
                teams[0],
                teams[1],
                mode,
                onRequestKnockdown,
                onRequestCrowdCheer,
                { knockdown: manualKnockdown, crowd: manualCrowd }
            );
            setMatch(newMatch);
        }
    }, [
        teams,
        setMatch,
        mode,
        manualKnockdown,
        manualCrowd,
        onRequestKnockdown,
        onRequestCrowdCheer,
    ]);

    if (!teams) return null;

    return (
        <Container>
            <Header variant="h4">
                {teams[0].getName()} x {teams[1].getName()}
            </Header>
            <Header variant="h4">
                {teams[0].getScore()} - {teams[1].getScore()}
            </Header>
            <RostersContainer container spacing={3}>
                <Grid item xs={12} md={3}>
                    <TeamRoster team={teams[0]} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MatchBoard />
                    <ControlPanel />
                    <SimulationControls />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TeamRoster team={teams[1]} />
                </Grid>
            </RostersContainer>
        </Container>
    );
};

export default MatchPage;
