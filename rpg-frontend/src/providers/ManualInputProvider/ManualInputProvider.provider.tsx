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

const ManualInputProvider = ({ children }: { children: ReactNode }) => {
    const { phaseData, setUserInputData } = useSimulationContext();

    const [knockdownModalData, setKnockdownModalData] = useState<{
        isOpen: boolean;
        team: QuidditchTeam | null;
    }>({
        isOpen: false,
        team: null,
    });
    const [crowdModalData, setCrowdModalData] = useState<{
        isOpen: boolean;
        team: QuidditchTeam | null;
        numSelections: number;
    }>({
        isOpen: false,
        team: null,
        numSelections: 0,
    });
    const [knockdownSelectedPosition, setKnockdownSelectedPosition] =
        useState<QuidditchPosition | null>(null);
    const [crowdSelectedPositions, setCrowdSelectedPositions] = useState<
        QuidditchPosition[]
    >([]);

    useEffect(() => {
        if (phaseData) {
            if (phaseData.typeOfInput === 'knockdown') {
                setKnockdownModalData({
                    isOpen: true,
                    team: phaseData.currentTeam,
                });
            } else if (phaseData.typeOfInput === 'crowd') {
                setCrowdModalData({
                    isOpen: true,
                    team: phaseData.currentTeam,
                    numSelections: phaseData.roll > PARTIAL_MAX ? 2 : 1,
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
        } else if (crowdSelectedPositions.length > 0) {
            setUserInputData({
                crowd: [...crowdSelectedPositions],
            });
            setCrowdSelectedPositions([]);
        }
    }, [knockdownSelectedPosition, crowdSelectedPositions]);

    return (
        <ManualInputContext.Provider value={{}}>
            {children}
            <ManualKnockdownModal
                open={knockdownModalData.isOpen}
                team={knockdownModalData.team}
                onSelect={(position: QuidditchPosition) => {
                    setKnockdownModalData({
                        isOpen: false,
                        team: null,
                    });
                    setKnockdownSelectedPosition(position);
                }}
            />
            <ManualCrowdModal
                open={crowdModalData.isOpen}
                team={crowdModalData.team}
                selections={crowdModalData.numSelections}
                onSelect={(positions) => {
                    setCrowdModalData({
                        isOpen: false,
                        team: null,
                        numSelections: 0,
                    });
                    setCrowdSelectedPositions([...positions]);
                }}
            />
        </ManualInputContext.Provider>
    );
};

export { ManualInputProvider };
