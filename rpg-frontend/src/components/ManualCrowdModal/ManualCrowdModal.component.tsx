import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    ListItemButton,
    ListItemText,
    Typography,
    Grid,
} from '@mui/material';
import { QuidditchPosition } from '@_types/Quidditch';

interface ManualCrowdModalProps {
    open: boolean;
    availablePositions: QuidditchPosition[];
    selections: number;
    onSelect: (positions: QuidditchPosition[]) => void;
    onCancel: () => void;
}

const ManualCrowdModal: React.FC<ManualCrowdModalProps> = ({
    open,
    availablePositions,
    selections,
    onSelect,
    onCancel,
}) => {
    const [selectedPositions, setSelectedPositions] = useState<
        QuidditchPosition[]
    >([]);

    const handleToggle = (position: QuidditchPosition) => {
        setSelectedPositions((prev) => {
            if (prev.includes(position)) {
                return prev.filter((p) => p !== position);
            } else if (prev.length < selections) {
                return [...prev, position];
            }
            return prev;
        });
    };

    const handleConfirm = () => {
        onSelect(selectedPositions);
        setSelectedPositions([]);
    };

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle variant="h5">
                Select {selections} Position{selections > 1 ? 's' : ''} for
                Crowd Bonus
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {availablePositions.map((position) => (
                        <Grid item xs={6} key={position}>
                            <ListItemButton
                                onClick={() => handleToggle(position)}
                            >
                                <ListItemText
                                    primary={position}
                                    primaryTypographyProps={{ variant: 'h6' }}
                                />
                            </ListItemButton>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {selectedPositions.length} of {selections} selected.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    disabled={selectedPositions.length !== selections}
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManualCrowdModal;
