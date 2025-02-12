import { Box, Typography } from '@mui/material';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import RosterRow from './RosterRow';
import {
    Container,
    TeamRosterContainer,
    TeamsContainer,
    TeamType,
} from './TeamRoster.styles';

interface TeamRosterProps {
    team: QuidditchTeam;
    reverse?: boolean;
}
const TeamRoster = ({ team, reverse }: TeamRosterProps) => {
    const [mainTeam, reserveTeam] = team.getPlayingPlayers();

    return (
        <Container>
            <Typography variant="h6" align="center" gutterBottom>
                {team.getName()}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                {team.getScore()}
            </Typography>
            <TeamsContainer>
                <TeamRosterContainer
                    mb={2}
                    data-team={reverse ? 'main-reverse' : 'main'}
                >
                    <TeamType variant="subtitle1">Main Team</TeamType>
                    <RosterRow label="Chasers" players={mainTeam.Chaser} />
                    <RosterRow label="Beaters" players={mainTeam.Beater} />
                    <RosterRow label="Keeper" players={mainTeam.Keeper} />
                    <RosterRow label="Seeker" players={mainTeam.Seeker} />
                </TeamRosterContainer>

                <TeamRosterContainer
                    data-team={reverse ? 'reserve-reverse' : 'reserve'}
                >
                    <TeamType variant="subtitle1">Reserve Team</TeamType>
                    <RosterRow label="Chasers" players={reserveTeam.Chaser} />
                    <RosterRow label="Beaters" players={reserveTeam.Beater} />
                    <RosterRow label="Keeper" players={reserveTeam.Keeper} />
                    <RosterRow label="Seeker" players={reserveTeam.Seeker} />
                </TeamRosterContainer>
            </TeamsContainer>
        </Container>
    );
};

export default TeamRoster;
