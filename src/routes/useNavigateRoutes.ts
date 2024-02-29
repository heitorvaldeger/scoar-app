import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigateRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [routeIndex, setRouteIndex] = useState(0);

  const handleNavigateDashboardPage = () => navigate('dashboard');
  const handleNavigateAdministrationPage = () => navigate('administration');

  const handleLogout = async () => {
    // await logout();
    navigate('/login');
  }

  const handleUpdateRouteIndex = (index?: number) => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }

    setRouteIndex(index ?? 0);
  }

  return {
    routeIndex,
    handleNavigateDashboardPage,
    handleNavigateAdministrationPage,
    handleLogout,
    handleUpdateRouteIndex
  }
}