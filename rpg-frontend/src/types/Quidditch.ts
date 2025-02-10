import { QuidditchPlayer } from '@models/QuidditchPlayer';
import { QuidditchPosition } from '@constants/quidditch';

export type QuidditchPlayerData = {
    modifier: number;
    knockedOut?: boolean;
    isMainTeam: boolean;
    isPlaying: boolean;
    hasInjury: boolean;
};

export type QuidditchTeamPlayers = {
    [key in QuidditchPosition]: QuidditchPlayer[];
};

export type QuidditchMatchTeamPlayers = {
    Chaser: QuidditchPlayer[];
    Beater: QuidditchPlayer[];
    Keeper: QuidditchPlayer | undefined;
    Seeker: QuidditchPlayer | undefined;
};

export type QuidditchMatchData = {
    description: string;
    snitchSpotted: boolean;
    snitchCaught: boolean;
    currentRound: number;
    seekersKnockedOut: number;
    seekerPriority: string | undefined;
    matchEnded: boolean;
};

export type QuidditchMatchScore = {
    team1: number;
    team2: number;
};
