import React from 'react';
import EventLive from './pages/AdminPage/EventPage/EventLive';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import EventAll from './pages/AdminPage/EventPage/EventAll';
import EventPast from './pages/AdminPage/EventPage/EventPast';
import ManageAccount from './pages/AdminPage/ManageAccount/ManageAccount';
import ChangeAccountInfomation from './pages/AdminPage/ChangeAccountInformation/ChangeAccountInfomation';
import Login from './pages/LoginPage/Login';
import PrivateRoute from './helper/PrivateRouter';
import PublicRouter from './helper/PublicRouter';
import EventAllCenter from './pages/CenterPage/Event/EventAllCenter';
import EventLiveCenter from './pages/CenterPage/Event/EventLiveCenter';
import EventPastCenter from './pages/CenterPage/Event/EventPastCenter';
import Member from './pages/CenterPage/Team/Member';
import GiveTasks from './pages/CenterPage/Tasks/GiveTasks';
import TaskDone from './pages/CenterPage/Tasks/TaskDone';
import TaskNotDone from './pages/CenterPage/Tasks/TaskNotDone';
import EventFuture from './pages/AdminPage/EventPage/EventFuture';
import EventFutureCenter from './pages/CenterPage/Event/EventFutureCenter';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import TaskFail from './pages/CenterPage/Tasks/TaskFail';
import CreateEvent from './pages/CenterPage/Personal/CreateEvent';
import Finance from './pages/CenterPage/Personal/Finance';
import Chart from './pages/CenterPage/Personal/Chart';
import ChangePassword from './pages/CenterPage/ChangeAccountInformation/ChangePassword';
function App() {
  return (
    <Router>
    <>
      <Switch>
        <PublicRouter exact path="/">
          <Login/>
        </PublicRouter>
        <PrivateRoute exact path="/event">
          {sessionStorage.getItem("account_role") === "Admin" && <EventAll/>}
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <EventAllCenter/>}
        </PrivateRoute>
        <PrivateRoute exact path="/event-future">
          {sessionStorage.getItem("account_role") === "Admin" && <EventFuture/>}
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <EventFutureCenter/>}
        </PrivateRoute>
        <PrivateRoute exact path="/event-live">
          {sessionStorage.getItem("account_role") === "Admin" && <EventLive/> }
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <EventLiveCenter/>}   
        </PrivateRoute>
        <PrivateRoute exact path="/event-past"> 
          {sessionStorage.getItem("account_role") === "Admin" && <EventPast/>}
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <EventPastCenter/>}
        </PrivateRoute>
        <PrivateRoute exact path="/manage-account">
          <ManageAccount/>
        </PrivateRoute>
        <PrivateRoute exact path="/change-password">
          {sessionStorage.getItem("account_role") === "Admin" && <ChangeAccountInfomation/>   }
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <ChangePassword/>}       
        </PrivateRoute>
        <PrivateRoute exact path="/team">
          <Member/>    
        </PrivateRoute>
        <PrivateRoute exact path="/task-all">
          <GiveTasks/>    
        </PrivateRoute>
        <PrivateRoute exact path="/task-done">
          <TaskDone/>    
        </PrivateRoute>
        <PrivateRoute exact path="/task-in-process">
          <TaskNotDone/>    
        </PrivateRoute>
        <PrivateRoute exact path="/task-fail">
          <TaskFail/>    
        </PrivateRoute>
        <PrivateRoute exact path="/create-event">
          <CreateEvent/> 
        </PrivateRoute>
        <PrivateRoute exact path="/finance">
          <Finance/>
        </PrivateRoute>
        <PrivateRoute exact path="/chart">
          <Chart/>
        </PrivateRoute>
      </Switch>
    </>
  </Router>
  );
} 

export default App;
