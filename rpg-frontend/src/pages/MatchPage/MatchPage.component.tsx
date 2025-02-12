import { useEffect } from 'react';
import { Grid } from '@mui/material';
import MatchBoard from '@components/MatchBoard';
import ControlPanel from '@components/ControlPanel';
import SimulationControls from '@components/SimulationControls';
import { useSimulationContext } from '@providers/SimulationProvider';
import { useTeamsContext } from '@providers/TeamsProvider';
import { QuidditchMatch } from '@engine/QuidditchMatch';
import TeamRoster from '@components/TeamRoster';
import {
    ContainerElement,
    Header,
    RoastersContainer,
    WinnerRow,
} from './MatchPage.styles';

const MatchPage = () => {
    const { setMatch, winner, matchEnded } = useSimulationContext();

    const { selectedTeams: teams } = useTeamsContext();

    if (teams.length === 0) {
        location.href = '/';
    }

    useEffect(() => {
        if (teams && teams.length === 2) {
            const newMatch = new QuidditchMatch(teams[0], teams[1]);
            setMatch(newMatch);
        }
    }, [teams, setMatch]);

    return (
        <ContainerElement>
            <Header variant="h4">
                {matchEnded && (
                    <WinnerRow>Match Ended! Winner: {winner}</WinnerRow>
                )}
            </Header>
            <RoastersContainer container spacing={3}>
                <Grid item xs={12} md={3}>
                    <TeamRoster team={teams[0]} reverse />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ControlPanel />
                    <MatchBoard />
                    <SimulationControls />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TeamRoster team={teams[1]} />
                </Grid>
            </RoastersContainer>
        </ContainerElement>
    );
};

export default MatchPage;
