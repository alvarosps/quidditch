import { QuidditchPlayer } from '@models/QuidditchPlayer';
import { Box, Typography } from '@mui/material';
import { PlayerChip, RosterRowContainer } from './RosterRow.styles';
import { Seeker } from '@models/QuidditchPositions';

interface RosterRowProps {
    label: string;
    players: QuidditchPlayer[];
}
const RosterRow = ({ label, players }: RosterRowProps) => (
    <Box mb={1}>
        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
            {label}:
        </Typography>
        <RosterRowContainer>
            {players.map((player, i) => (
                <PlayerChip
                    key={`${player.getName()}-${i}`}
                    data-knockedout={player.getKnockedOut()}
                >
                    <span>{player.getName()}</span>
                    <span style={{ fontSize: '10px' }}>
                        mod: {player.getModifier()} | fw: {player.getForward()}{' '}
                        | crowd: {player.getCrowdBonus()}
                    </span>
                    {player instanceof Seeker && (
                        <span style={{ fontSize: '10px' }}>
                            round bonus: {(player as Seeker).getRoundBonus()}
                        </span>
                    )}
                </PlayerChip>
            ))}
        </RosterRowContainer>
    </Box>
);

export default RosterRow;
