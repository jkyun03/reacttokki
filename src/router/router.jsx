import { createBrowserRouter, Navigate } from "react-router-dom";
import Process from "../pages/Process/Process";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/process" replace />,
  },
  {
    path: "/process",
    element: <Process />,
  },
]);

export default router;
