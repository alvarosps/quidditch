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
import { QuidditchPosition } from '@constants/quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';

interface ManualCrowdModalProps {
    open: boolean;
    team1: QuidditchTeam;
    team2: QuidditchTeam;
    selections: number[];
    onSelect: (p1: QuidditchPosition[], p2: QuidditchPosition[]) => void;
}

const ManualCrowdModal: React.FC<ManualCrowdModalProps> = ({
    open,
    team1,
    team2,
    selections,
    onSelect,
}) => {
    if (!team1 || !team2) {
        return null;
    }

    const availablePositionsTeam1 = team1.getAvailablePositions();
    const availablePositionsTeam2 = team2.getAvailablePositions();

    const [selectedPositionsTeam1, setSelectedPositionsTeam1] = useState<
        QuidditchPosition[]
    >([]);
    const [selectedPositionsTeam2, setSelectedPositionsTeam2] = useState<
        QuidditchPosition[]
    >([]);

    const handleToggleTeam1 = (position: QuidditchPosition) => {
        setSelectedPositionsTeam1((prev) => {
            if (prev.includes(position)) {
                return prev.filter((p) => p !== position);
            } else if (prev.length < selections[0]) {
                return [...prev, position];
            }
            return prev;
        });
    };

    const handleToggleTeam2 = (position: QuidditchPosition) => {
        setSelectedPositionsTeam2((prev) => {
            if (prev.includes(position)) {
                return prev.filter((p) => p !== position);
            } else if (prev.length < selections[1]) {
                return [...prev, position];
            }
            return prev;
        });
    };

    const handleConfirm = () => {
        onSelect(selectedPositionsTeam1, selectedPositionsTeam2);
        setSelectedPositionsTeam1([]);
        setSelectedPositionsTeam2([]);
    };

    return (
        <Dialog open={open} aria-labelledby="manual-crowd-modal-title">
            <DialogTitle id="manual-crowd-modal-title" variant="h5">
                Select {selections} Position{selections[0] > 1 ? 's' : ''} for
                Crowd Bonus
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" align="center">
                    {team1.getName()}
                </Typography>
                <Grid container spacing={2}>
                    {availablePositionsTeam1.map((position) => {
                        const isSelected = selectedPositionsTeam1.includes(
                            position as QuidditchPosition
                        );
                        return (
                            <Grid item xs={6} key={position}>
                                <ListItemButton
                                    onClick={() =>
                                        handleToggleTeam1(
                                            position as QuidditchPosition
                                        )
                                    }
                                    sx={{
                                        border: isSelected
                                            ? '2px solid #e0e0e0'
                                            : '1px solid transparent',
                                        borderRadius: 1,
                                        transition:
                                            'background-color 0.3s, border 0.3s',
                                        backgroundColor: isSelected
                                            ? 'rgba(0, 0, 0, 0.08)'
                                            : 'inherit',
                                    }}
                                >
                                    <ListItemText
                                        primary={position}
                                        primaryTypographyProps={{
                                            variant: 'h6',
                                            align: 'center',
                                        }}
                                    />
                                </ListItemButton>
                            </Grid>
                        );
                    })}
                </Grid>
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 2, textAlign: 'center' }}
                >
                    {selectedPositionsTeam1.length} of {selections[0]} selected.
                </Typography>
            </DialogContent>
            <DialogContent dividers>
                <Typography variant="h6" align="center">
                    {team2.getName()}
                </Typography>
                <Grid container spacing={2}>
                    {availablePositionsTeam2.map((position) => {
                        const isSelected = selectedPositionsTeam2.includes(
                            position as QuidditchPosition
                        );
                        return (
                            <Grid item xs={6} key={position}>
                                <ListItemButton
                                    onClick={() =>
                                        handleToggleTeam2(
                                            position as QuidditchPosition
                                        )
                                    }
                                    sx={{
                                        border: isSelected
                                            ? '2px solid #e0e0e0'
                                            : '1px solid transparent',
                                        borderRadius: 1,
                                        transition:
                                            'background-color 0.3s, border 0.3s',
                                        backgroundColor: isSelected
                                            ? 'rgba(0, 0, 0, 0.08)'
                                            : 'inherit',
                                    }}
                                >
                                    <ListItemText
                                        primary={position}
                                        primaryTypographyProps={{
                                            variant: 'h6',
                                            align: 'center',
                                        }}
                                    />
                                </ListItemButton>
                            </Grid>
                        );
                    })}
                </Grid>
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 2, textAlign: 'center' }}
                >
                    {selectedPositionsTeam2.length} of {selections[1]} selected.
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{ justifyContent: 'space-between', px: 3, py: 2 }}
            >
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={
                        selectedPositionsTeam1.length !== selections[0] &&
                        selectedPositionsTeam2.length !== selections[1]
                    }
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManualCrowdModal;
