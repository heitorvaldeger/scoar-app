import { useEffect } from "react";
import { AppBar, BottomNavigation, BottomNavigationAction, Paper, Toolbar } from "@mui/material";
import { AdminPanelSettings, Dashboard, Logout } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

import logo from '@/assets/images/ifrn-logo.png';
import { useNavigateRoutes } from "@/routes/useNavigateRoutes";

export const MainTemplate = () => {
  const {
    handleLogout,
    handleNavigateDashboardPage,
    handleNavigateAdministrationPage,
    handleUpdateRouteIndex,
    routeIndex
  } = useNavigateRoutes();

  useEffect(() => {
    handleUpdateRouteIndex();
  }, []);

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <img src={logo} alt="ifrn logo" width={150} />
        </Toolbar>
      </AppBar>

      <div className="mb-16 mt-2">
        <Outlet />
      </div>

      <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={routeIndex}
          onChange={(_event, newValue) => handleUpdateRouteIndex(newValue)}
        >
          <BottomNavigationAction
            label="Dashboard"
            icon={<Dashboard />}
            className={`${(routeIndex !== 0) ? 'text-gray-500' : 'text-green-600'}`}
            onClick={handleNavigateDashboardPage}
            sx={{
              '&.Mui-selected': {
                color: 'success.main'
              }
            }}
          />
          <BottomNavigationAction
            key={'bottom-navigation-action-panel'}
            className={`${(routeIndex !== 1) ? 'text-gray-500' : 'text-green-600'}`}
            label="Gerência"
            icon={<AdminPanelSettings />}
            onClick={handleNavigateAdministrationPage}
            sx={{
              '&.Mui-selected': {
                color: 'success.main'
              }
            }}
          />,
          <BottomNavigationAction
            className={`${(routeIndex !== 3) ? 'text-gray-500' : 'text-green-600'}`}
            label="Sair"
            icon={<Logout />}
            onClick={handleLogout}
          />
        </BottomNavigation>
      </Paper>
    </div>
  )
}