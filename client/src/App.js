import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import EventAll from "./pages/AdminPage/EventPage/EventAll";
import ManageAccount from "./pages/AdminPage/ManageAccount/ManageAccount";
import ChangeAccountInfomation from "./pages/AdminPage/ChangeAccountInformation/ChangeAccountInfomation";
import Login from "./pages/LoginPage/Login";
import PrivateRoute from "./helper/PrivateRouter";
import PublicRouter from "./helper/PublicRouter";
import EventAllCenter from "./pages/CenterPage/Event/EventAllCenter";
import Member from "./pages/CenterPage/Team/Member";
import GiveTasks from "./pages/CenterPage/Tasks/GiveTasks";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Finance from "./pages/CenterPage/Personal/Finance";
import Chart from "./pages/CenterPage/Personal/Chart";
import ChangePassword from "./pages/CenterPage/ChangeAccountInformation/ChangePassword";
import ChangePasswordStaff from "./pages/StaffPage/AccountDetails/ChangePasswordStaff";
import DetailsAccount from "./pages/CenterPage/ChangeAccountInformation/DetailsAccount";
import DetailsAccountStaff from "./pages/StaffPage/AccountDetails/DetailsAccountStaff";
import EventStaff from "./pages/StaffPage/EventPage/EventStaff";
import TaskStaff from "./pages/StaffPage/Tasks/TaskStaff";
import DetailsAccountAdmin from "./pages/AdminPage/ChangeAccountInformation/DetailsAccountAdmin";
function App() {
  return (
    <Router>
      <>
        <Switch>
          <PublicRouter exact path="/">
            <Login />
          </PublicRouter>
          <PrivateRoute exact path="/event">
            {sessionStorage.getItem("account_role") === "Admin" && <EventAll />}
            {sessionStorage.getItem("account_role") === "DTU Event Center" && (
              <EventAllCenter />
            )}
            {sessionStorage.getItem("account_role") === "DTU Event Staff" && (
              <EventStaff />
            )}
          </PrivateRoute>
          <PrivateRoute exact path="/manage-account">
            <ManageAccount />
          </PrivateRoute>
          <PrivateRoute exact path="/change-password">
            {sessionStorage.getItem("account_role") === "Admin" && (
              <ChangeAccountInfomation />
            )}
            {sessionStorage.getItem("account_role") === "DTU Event Center" && (
              <ChangePassword />
            )}
            {sessionStorage.getItem("account_role") === "DTU Event Staff" && (
              <ChangePasswordStaff />
            )}
          </PrivateRoute>
          <PrivateRoute exact path="/team">
            <Member />
          </PrivateRoute>
          <PrivateRoute exact path="/task-all">
            {sessionStorage.getItem("account_role") === "DTU Event Center" && (
              <GiveTasks />
            )}
            {sessionStorage.getItem("account_role") === "DTU Event Staff" && (
              <TaskStaff />
            )}
          </PrivateRoute>
          <PrivateRoute exact path="/finance">
            <Finance />
          </PrivateRoute>
          <PrivateRoute exact path="/chart">
            <Chart />
          </PrivateRoute>
          <PrivateRoute exact path="/account-details">
            {sessionStorage.getItem("account_role") === "Admin" && (
              <DetailsAccountAdmin />
            )}
            {sessionStorage.getItem("account_role") === "DTU Event Center" && (
              <DetailsAccount />
            )}
            {sessionStorage.getItem("account_role") === "DTU Event Staff" && (
              <DetailsAccountStaff />
            )}
          </PrivateRoute>
        </Switch>
      </>
    </Router>
  );
}

export default App;
