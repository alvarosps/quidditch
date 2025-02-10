import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { QuidditchPosition } from '@_types/Quidditch';

interface ManualKnockdownModalProps {
    open: boolean;
    availablePositions: QuidditchPosition[];
    onSelect: (position: string) => void;
    onCancel: () => void;
}

const ManualKnockdownModal: React.FC<ManualKnockdownModalProps> = ({
    open,
    availablePositions,
    onSelect,
    onCancel,
}) => {
    return (
        <Dialog open={open} onClose={onCancel}>
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
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManualKnockdownModal;
