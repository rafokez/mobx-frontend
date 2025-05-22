import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Visits from "../pages/Visits";
import CreateProperty from "../pages/CreateProperty";
import Clients from "../pages/Clients";
import CreateClient from "../pages/CreateClient";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/properties", element: <Properties /> },
  { path: "/properties/:id", element: <PropertyDetails /> },
  { path: "/create-property", element: <CreateProperty /> },
  { path: "/visits", element: <Visits /> },
  { path: "/clients", element: <Clients /> },
  { path: "/create-client", element: <CreateClient /> },
  { path: "/profile", element: <Profile /> },
]);

export default router;