import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import TeamsPage from "./pages/teamsPage/teamsPage";
import LoginPage from "./pages/loginPage/loginPage";
import EmployeesPage from "./pages/employeesPage/employeesPage";
import ProfilePage from "./pages/profilePage/profilePage";
import SelectedEmployeePage from "./pages/selectedEmployeePage/selectedEmployeePage";
import SelectedTeamPage from "./pages/selectedTeamPage/selectedTeamPage";
import CreateTeamPage from "./pages/createTeamPage/createTeamPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/:id" element={<SelectedEmployeePage />} />
      <Route path="/teams/:id" element={<SelectedTeamPage />} />
      <Route path="/teams/create/" element={<CreateTeamPage />} />
    </Route>
  )
);

export default router;