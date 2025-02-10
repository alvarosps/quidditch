import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '@components/Navigation';
import HomePage from '@pages/HomePage';
import MatchPage from '@pages/MatchPage';
import { SimulationProvider } from '@providers/SimulationProvider';
import { ManualInputProvider } from '@providers/ManualInputProvider';
import TeamManagementPage from '@pages/TeamManagementPage';
import { TeamsProvider } from '@providers/TeamsProvider';

const App: React.FC = () => {
    return (
        <ManualInputProvider>
            <SimulationProvider>
                <TeamsProvider>
                    <Router>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/match" element={<MatchPage />} />
                            <Route
                                path="/manage-team"
                                element={<TeamManagementPage />}
                            />
                        </Routes>
                    </Router>
                </TeamsProvider>
            </SimulationProvider>
        </ManualInputProvider>
    );
};

export default App;
