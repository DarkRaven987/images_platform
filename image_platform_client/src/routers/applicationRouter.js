import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from '../views/Dashboard/Dashboard';
import LoginView from '../views/Login/Login';
import { useEffect } from 'react';
import { API_VALIDATE_URL } from '../utils/agentConsts';
import { agent } from '../utils/agent';

const ApplicationRouter = () => {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (window.location.pathname !== '/login') {
      const refreshToken = localStorage.getItem('refreshToken');
      agent.post(API_VALIDATE_URL, { jwt: refreshToken });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            accessToken ? <Navigate to="/dashboard" /> : <Navigate to="/" />
          }
        />
        <Route path="/login" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRouter;
