import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Fallback } from "@/components/FallBack";
import { MainTemplate } from "@/templates/main";
import { NotFound } from "@/components/NotFound";
import { Dashboard } from "@/views/Dashboard";
import { Login } from "@/views/Login";
import { Administration } from "@/views/Administration";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainTemplate />,
    errorElement: <NotFound />,
    children: [
      {
        path: "administration/",
        element: <Administration />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound/>,
  },
]);

export const Routes = () => {
  return (
    <RouterProvider router={routers} fallbackElement={<Fallback />}/>
  );
};