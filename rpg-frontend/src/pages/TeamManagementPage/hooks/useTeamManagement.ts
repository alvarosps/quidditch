import { QuidditchTeamPlayers } from '@_types/Quidditch';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { QuidditchPlayer } from '@models/QuidditchPlayer';
import { Beater, Chaser, Keeper, Seeker } from '@models/QuidditchPositions';
import { useEffect, useState } from 'react';

export const useTeamManagement = (team: QuidditchTeam) => {
    const [crowdModifier, setCrowdModifier] = useState<number>(
        team.getCrowdModifier()
    );
    const [players, setPlayers] = useState<QuidditchTeamPlayers>(
        team.getPlayers()
    );
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCrowdModifierChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCrowdModifier(Number(e.target.value));
    };

    const updatePlayersState = (player: QuidditchPlayer) => {
        const updatedPlayers = { ...players };
        if (player instanceof Seeker) {
            updatedPlayers.Seeker = players.Seeker.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        } else if (player instanceof Beater) {
            updatedPlayers.Beater = players.Beater.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        } else if (player instanceof Chaser) {
            updatedPlayers.Chaser = players.Chaser.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        } else if (player instanceof Keeper) {
            updatedPlayers.Keeper = players.Keeper.map((p) =>
                p.getName() === player.getName() ? player : p
            );
        }
        setPlayers(updatedPlayers);
    };

    const handleNameChange = (player: QuidditchPlayer, name: string) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setName(name);
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const handleModifierChange = (player: QuidditchPlayer, value: number) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setModifier(value);
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const handleMainTeamToggle = (player: QuidditchPlayer) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setIsMainTeam(!player.getIsMainTeam());
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const handleIsPlayingToggle = (player: QuidditchPlayer) => {
        const updatedPlayer = { ...player };
        updatedPlayer.setIsPlaying(!player.getIsPlaying());
        updatePlayersState(updatedPlayer as QuidditchPlayer);
    };

    const saveChanges = () => {
        team.setCrowdModifier(crowdModifier);
        team.setMainTeam({
            Chaser: players.Chaser.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ),
            Beater: players.Beater.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            ),
            Keeper: players.Keeper.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            )[0],
            Seeker: players.Seeker.filter(
                (p) => p.getIsMainTeam() && p.getIsPlaying()
            )[0],
        });

        alert('Changes saved successfully!');
    };

    useEffect(() => {
        const mainTeamCounts = {
            Chaser: players.Chaser.filter((p) => p.getIsMainTeam()).length,
            Beater: players.Beater.filter((p) => p.getIsMainTeam()).length,
            Keeper: players.Keeper.filter((p) => p.getIsMainTeam()).length,
            Seeker: players.Seeker.filter((p) => p.getIsMainTeam()).length,
        };

        const isPlayingCounts = {
            Chaser: players.Chaser.filter((p) => p.getIsPlaying()).length,
            Beater: players.Beater.filter((p) => p.getIsPlaying()).length,
            Keeper: players.Keeper.filter((p) => p.getIsPlaying()).length,
            Seeker: players.Seeker.filter((p) => p.getIsPlaying()).length,
        };

        if (
            mainTeamCounts.Chaser !== 3 ||
            isPlayingCounts.Chaser !== 3 ||
            mainTeamCounts.Beater !== 2 ||
            isPlayingCounts.Beater !== 2 ||
            mainTeamCounts.Keeper !== 1 ||
            isPlayingCounts.Keeper !== 1 ||
            mainTeamCounts.Seeker !== 1 ||
            isPlayingCounts.Seeker !== 1
        ) {
            setError(true);
            setErrorMessage(
                'Invalid number of players in the main team for one or more positions.'
            );
        } else {
            setError(false);
            setErrorMessage('');
        }
    }, [players]);

    return {
        crowdModifier,
        handleCrowdModifierChange,
        players,
        handleNameChange,
        handleModifierChange,
        handleMainTeamToggle,
        handleIsPlayingToggle,
        error,
        errorMessage,
        saveChanges,
    };
};
