import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { QuidditchTeam } from '@engine/QuidditchTeam';

interface ManualKnockdownModalProps {
    open: boolean;
    team: QuidditchTeam | null;
    onSelect: (position: string) => void;
}

const ManualKnockdownModal = ({
    open,
    team,
    onSelect,
}: ManualKnockdownModalProps) => {
    const availablePositions = team ? team.getAvailablePositions() : [];
    return (
        <Dialog open={open} onClose={() => {}}>
            <DialogTitle>Select a Position to Knock Down</DialogTitle>
            <DialogContent>
                <List>
                    {availablePositions.map((position) => (
                        <ListItemButton
                            key={position}
                            onClick={() => onSelect(position)}
                        >
                            <ListItemText primary={position} />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ManualKnockdownModal;
