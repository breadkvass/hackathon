import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import TeamsPage from "./pages/teams/teams-page";
import LoginPage from "./pages/login/login-page";
import EmployeesPage from "./pages/employees/employees-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/teams"
        element={<TeamsPage />}
      />
      <Route
        path="/employees"
        element={<EmployeesPage />}
      />
    </Route>
  )
);

export default router;