import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItemButton,
    ListItemText,
    DialogActions,
    Button,
} from '@mui/material';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchPosition } from '@constants/quidditch';
import { useState } from 'react';

interface ManualKnockdownModalProps {
    open: boolean;
    team1: QuidditchTeam | null;
    team2: QuidditchTeam | null;
    onSelect: (
        position1: QuidditchPosition,
        position2: QuidditchPosition
    ) => void;
}

const ManualKnockdownModal = ({
    open,
    team1,
    team2,
    onSelect,
}: ManualKnockdownModalProps) => {
    if (!team1 || !team2) {
        return null;
    }

    const availablePositionsTeam1 = team1.getAvailablePositions();
    const availablePositionsTeam2 = team2.getAvailablePositions();

    const [selectedPositionsTeam1, setSelectedPositionsTeam1] =
        useState<QuidditchPosition | null>(null);
    const [selectedPositionsTeam2, setSelectedPositionsTeam2] =
        useState<QuidditchPosition | null>(null);

    const handleToggleTeam1 = (position: QuidditchPosition) => {
        setSelectedPositionsTeam1(position);
    };

    const handleToggleTeam2 = (position: QuidditchPosition) => {
        setSelectedPositionsTeam2(position);
    };

    const handleConfirm = () => {
        if (selectedPositionsTeam1 && selectedPositionsTeam2) {
            onSelect(selectedPositionsTeam1, selectedPositionsTeam2);
        }
    };

    return (
        <Dialog open={open} onClose={() => {}}>
            <DialogTitle>
                Select a Position to Knock Down in {team1.getName()}
            </DialogTitle>
            <DialogContent>
                <List>
                    {availablePositionsTeam1.map((position) => (
                        <ListItemButton
                            key={position}
                            onClick={() =>
                                handleToggleTeam1(position as QuidditchPosition)
                            }
                        >
                            <ListItemText primary={position} />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
            <DialogTitle>
                Select a Position to Knock Down in {team2.getName()}
            </DialogTitle>
            <DialogContent>
                <List>
                    {availablePositionsTeam2.map((position) => (
                        <ListItemButton
                            key={position}
                            onClick={() =>
                                handleToggleTeam2(position as QuidditchPosition)
                            }
                        >
                            <ListItemText primary={position} />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
            <DialogActions
                sx={{ justifyContent: 'space-between', px: 3, py: 2 }}
            >
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={
                        !selectedPositionsTeam1 && !selectedPositionsTeam2
                    }
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManualKnockdownModal;
