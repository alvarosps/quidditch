import { QuidditchMatchData, QuidditchMatchScore } from '@_types/Quidditch';
import { QuidditchMatch } from 'engine/QuidditchMatch';
import { ReactNode, useEffect, useState } from 'react';
import { SimulationContext } from './SimulationProvider.context';
import {
    SimulationContextType,
    SimulationMode,
} from './SimulationProvider.types';
import { useManualInputContext } from '@providers/ManualInputProvider';

const SimulationProvider = ({ children }: { children: ReactNode }) => {
    const [match, setMatch] = useState<QuidditchMatch | null>(null);
    const [matchData, setMatchData] = useState<QuidditchMatchData>({
        description: '',
        snitchSpotted: false,
        snitchCaught: false,
        currentRound: 1,
        seekersKnockedOut: 0,
        seekerPriority: undefined,
        matchEnded: false,
    });
    const [mode, setMode] = useState<SimulationMode>('roundByRound');
    const [roundInterval, setRoundInterval] = useState<number>(1000);
    const [manualKnockdown, setManualKnockdown] = useState<boolean>(false);
    const [manualCrowd, setManualCrowd] = useState<boolean>(false);
    const [round, setRound] = useState(1);
    const [score, setScore] = useState<QuidditchMatchScore>({
        team1: 0,
        team2: 0,
    });
    const [description, setDescription] = useState('');
    const [isPaused, setIsPaused] = useState(false);

    const { requestKnockdown, requestCrowdCheer } = useManualInputContext();

    const simulateNextPhase = async () => {
        if (match && !match.getMatchEnded()) {
            const updatedData = await match.simulateNextPhase();
            console.log(' phase', updatedData);
            setMatchData({ ...updatedData });
            setRound(updatedData.currentRound);
            setScore({
                team1: match.getTeam1().getScore(),
                team2: match.getTeam2().getScore(),
            });
            setDescription(updatedData.description);
        }
    };

    const simulateNextRound = async () => {
        if (match && !match.getMatchEnded()) {
            const updatedData = await match.simulateNextRound();
            console.log('updatedData', updatedData);
            setMatchData({ ...updatedData });
            setRound(updatedData.currentRound);
            setScore({
                team1: match.getTeam1().getScore(),
                team2: match.getTeam2().getScore(),
            });
            setDescription(updatedData.description);
        }
    };

    const toggleAutoMode = () => {
        setMode((prev) => (prev === 'auto' ? 'roundByRound' : 'auto'));
    };

    const onPauseToggle = () => {
        setIsPaused((prev) => !prev);
    };

    const resetMatch = () => {
        if (matchData) {
            const newMatch = new QuidditchMatch(
                match.getTeam1(),
                match.getTeam2(),
                mode,
                requestKnockdown,
                requestCrowdCheer,
                {
                    knockdown: manualKnockdown,
                    crowd: manualCrowd,
                }
            );
            newMatch.resetMatch();
            setMatch(newMatch);
            setMatchData(newMatch.getMatchData());
            setRound(1);
            setScore({
                team1: 0,
                team2: 0,
            });
            setDescription(newMatch.getMatchData().description);
        }
    };

    useEffect(() => {
        if (mode === 'auto' && match && !isPaused && !match.getMatchEnded()) {
            const interval = setInterval(() => {
                simulateNextRound();
            }, roundInterval);
            return () => clearInterval(interval);
        }
    }, [mode, match, isPaused, roundInterval, matchData]);

    const contextValue: SimulationContextType = {
        match,
        setMatch,
        matchData,
        simulateNextRound,
        mode,
        toggleAutoMode,
        setMode,
        roundInterval,
        setRoundInterval,
        manualKnockdown,
        setManualKnockdown,
        manualCrowd,
        setManualCrowd,
        round,
        setRound,
        score,
        setScore,
        description,
        setDescription,
        isPaused,
        onPauseToggle,
        onRequestKnockdown: requestKnockdown,
        onRequestCrowdCheer: requestCrowdCheer,
        resetMatch,
        simulateNextPhase,
    };

    return (
        <SimulationContext.Provider value={contextValue}>
            {children}
        </SimulationContext.Provider>
    );
};

export { SimulationProvider };
