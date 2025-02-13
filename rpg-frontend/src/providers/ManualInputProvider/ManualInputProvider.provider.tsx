import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ManualInputContextType } from './ManualInputProvider.types';
import {
    ManualInputContext,
    useManualInputContext,
} from './ManualInputProvider.context';
import ManualKnockdownModal from '@components/ManualKnockdownModal';
import ManualCrowdModal from '@components/ManualCrowdModal';
import { PARTIAL_MAX, QuidditchPosition } from '@constants/quidditch';
import { useSimulationContext } from '@providers/SimulationProvider';
import { QuidditchTeam } from '@engine/QuidditchTeam';
import { ManualCrowdInput, ManualKnockdownInput } from '@_types/Simulation';

const ManualInputProvider = ({ children }: { children: ReactNode }) => {
    const { phaseData, setUserInputData } = useSimulationContext();

    const [knockdownModalData, setKnockdownModalData] = useState<{
        isOpen: boolean;
        team1: QuidditchTeam | null;
        team2: QuidditchTeam | null;
    }>({
        isOpen: false,
        team1: null,
        team2: null,
    });
    const [crowdModalData, setCrowdModalData] = useState<{
        isOpen: boolean;
        team1: QuidditchTeam | null;
        team2: QuidditchTeam | null;
        numSelections: number[];
    }>({
        isOpen: false,
        team1: null,
        team2: null,
        numSelections: [],
    });
    const [knockdownSelectedPosition, setKnockdownSelectedPosition] =
        useState<ManualKnockdownInput | null>(null);
    const [crowdSelectedPositions, setCrowdSelectedPositions] =
        useState<ManualCrowdInput | null>(null);

    useEffect(() => {
        if (phaseData) {
            if (phaseData.typeOfInput === 'knockdown') {
                setKnockdownModalData({
                    isOpen: true,
                    team1: phaseData.team1,
                    team2: phaseData.team2,
                });
            } else if (phaseData.typeOfInput === 'crowd') {
                const numSelectionsTeam1 =
                    phaseData.rollTeam1 > PARTIAL_MAX ? 2 : 1;
                const numSelectionsTeam2 =
                    phaseData.rollTeam2 > PARTIAL_MAX ? 2 : 1;
                setCrowdModalData({
                    isOpen: true,
                    team1: phaseData.team1,
                    team2: phaseData.team2,
                    numSelections: [numSelectionsTeam1, numSelectionsTeam2],
                });
            }
        }
    }, [phaseData]);

    useEffect(() => {
        if (knockdownSelectedPosition) {
            setUserInputData({
                knockdown: knockdownSelectedPosition,
            });
            setKnockdownSelectedPosition(null);
        } else if (crowdSelectedPositions) {
            setUserInputData({
                crowd: { ...crowdSelectedPositions },
            });
            setCrowdSelectedPositions(null);
        }
    }, [knockdownSelectedPosition, crowdSelectedPositions]);

    return (
        <ManualInputContext.Provider value={{}}>
            {children}
            <ManualKnockdownModal
                open={knockdownModalData.isOpen}
                team1={knockdownModalData.team1}
                team2={knockdownModalData.team2}
                onSelect={(
                    position1: QuidditchPosition,
                    position2: QuidditchPosition
                ) => {
                    setKnockdownModalData({
                        isOpen: false,
                        team1: null,
                        team2: null,
                    });
                    setKnockdownSelectedPosition({
                        team1: position1,
                        team2: position2,
                    });
                }}
            />
            <ManualCrowdModal
                open={crowdModalData.isOpen}
                team1={crowdModalData.team1}
                team2={crowdModalData.team2}
                selections={crowdModalData.numSelections}
                onSelect={(
                    p1: QuidditchPosition[],
                    p2: QuidditchPosition[]
                ) => {
                    setCrowdModalData({
                        isOpen: false,
                        team1: null,
                        team2: null,
                        numSelections: [],
                    });
                    setCrowdSelectedPositions({
                        team1: {
                            position1: p1[0],
                            position2: p1[1],
                        },
                        team2: {
                            position1: p2[0],
                            position2: p2[1],
                        },
                    });
                }}
            />
        </ManualInputContext.Provider>
    );
};

export { ManualInputProvider };
