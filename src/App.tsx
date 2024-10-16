import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import TeamsPage from "./pages/teams/teams-page";
import LoginPage from "./pages/login/login-page";
import EmployeesPage from "./pages/employees/employees-page";
import ProfilePage from "./pages/profile/profile-page";
import EmployeePage from "./pages/employee-page/employee-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/:id" element={<EmployeePage />} />
    </Route>
  )
);

export default router;