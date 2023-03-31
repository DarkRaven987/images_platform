import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from '../views/Dashboard/Dashboard';
import LoginView from '../views/Login/Login';

const ApplicationRouter = () => {
  const accessToken = localStorage.getItem('accessToken');
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
