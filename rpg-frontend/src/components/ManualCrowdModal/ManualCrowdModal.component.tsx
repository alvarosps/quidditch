import { useState } from 'react';
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
import { QuidditchPosition } from '@constants/quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';

interface ManualCrowdModalProps {
    open: boolean;
    team: QuidditchTeam;
    selections: number;
    onSelect: (positions: QuidditchPosition[]) => void;
}

const ManualCrowdModal = ({
    open,
    team,
    selections,
    onSelect,
}: ManualCrowdModalProps) => {
    const availablePositions = team ? team.getAvailablePositions() : [];

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
        <Dialog open={open} onClose={() => {}}>
            <DialogTitle variant="h5">
                Select {selections} Position{selections > 1 ? 's' : ''} for
                Crowd Bonus
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {availablePositions.map((position) => (
                        <Grid item xs={6} key={position}>
                            <ListItemButton
                                onClick={() =>
                                    handleToggle(position as QuidditchPosition)
                                }
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
