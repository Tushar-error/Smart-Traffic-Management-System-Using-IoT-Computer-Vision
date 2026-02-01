// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import LiveMonitoring from './pages/LiveMonitoring';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Analytics from './pages/Analytics';

const App: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/live" element={<LiveMonitoring />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;