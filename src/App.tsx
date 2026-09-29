import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JobsProvider } from './context/JobsContext';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import RunnerPage from './pages/RunnerPage';
import HirerPage from './pages/HirerPage';
import HirerDashboard from './pages/hirer/HirerDashboard';
import HirerJobs from './pages/hirer/HirerJobs';
import HirerJobDetail from './pages/hirer/HirerJobDetail';
import HirerTalent from './pages/hirer/HirerTalent';
import HirerMessages from './pages/hirer/HirerMessages';
import HirerReports from './pages/hirer/HirerReports';
import HirerPostJob from './pages/hirer/HirerPostJob';

function App() {
  return (
    <BrowserRouter>
      <JobsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/runner" element={<RunnerPage />} />

          {/* Hirer layout with nested routes */}
          <Route path="/hirer" element={<HirerPage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HirerDashboard />} />
            <Route path="jobs" element={<HirerJobs />} />
            <Route path="jobs/:jobId" element={<HirerJobDetail />} />
            <Route path="talent" element={<HirerTalent />} />
            <Route path="messages" element={<HirerMessages />} />
            <Route path="reports" element={<HirerReports />} />
            <Route path="post" element={<HirerPostJob />} />
          </Route>
        </Routes>
      </JobsProvider>
    </BrowserRouter>
  );
}

export default App;
