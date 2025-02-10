import { ReactNode, useCallback, useState } from 'react';
import { ManualInputContextType } from './ManualInputProvider.types';
import { ManualInputContext } from './ManualInputProvider.context';
import ManualKnockdownModal from '@components/ManualKnockdownModal';
import ManualCrowdModal from '@components/ManualCrowdModal';
import { QuidditchPosition } from '@constants/quidditch';

const ManualInputProvider = ({ children }: { children: ReactNode }) => {
    const [knockdownModalOpen, setKnockdownModalOpen] = useState(false);
    const [crowdModalOpen, setCrowdModalOpen] = useState(false);
    const [knockdownResolver, setKnockdownResolver] = useState<
        (value: QuidditchPosition) => void
    >(() => () => {});
    const [crowdResolver, setCrowdResolver] = useState<
        (value: QuidditchPosition[]) => void
    >(() => () => {});
    const [crowdSelections, setCrowdSelections] = useState<number>(2);

    // Define your available positions (you might adjust this layout later)
    const availablePositions = [
        QuidditchPosition.Chaser,
        QuidditchPosition.Beater,
        QuidditchPosition.Keeper,
        QuidditchPosition.Seeker,
    ];

    const requestKnockdown = useCallback((): Promise<QuidditchPosition> => {
        return new Promise((resolve) => {
            setKnockdownResolver(() => resolve);
            setKnockdownModalOpen(true);
        });
    }, []);

    const requestCrowdCheer = useCallback(
        (selections: number): Promise<QuidditchPosition[]> => {
            setCrowdSelections(selections);
            return new Promise((resolve) => {
                setCrowdResolver(() => resolve);
                setCrowdModalOpen(true);
            });
        },
        []
    );

    const contextValue: ManualInputContextType = {
        requestKnockdown,
        requestCrowdCheer,
    };

    return (
        <ManualInputContext.Provider value={contextValue}>
            {children}
            <ManualKnockdownModal
                open={knockdownModalOpen}
                availablePositions={availablePositions}
                onSelect={(position: QuidditchPosition) => {
                    setKnockdownModalOpen(false);
                    knockdownResolver(position);
                }}
                onCancel={() => {
                    setKnockdownModalOpen(false);
                }}
            />
            <ManualCrowdModal
                open={crowdModalOpen}
                availablePositions={availablePositions}
                selections={crowdSelections}
                onSelect={(positions) => {
                    setCrowdModalOpen(false);
                    crowdResolver(positions);
                }}
                onCancel={() => {
                    setCrowdModalOpen(false);
                }}
            />
        </ManualInputContext.Provider>
    );
};

export { ManualInputProvider };
