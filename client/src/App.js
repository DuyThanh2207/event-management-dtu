import React from 'react';
import EventLive from './pages/AdminPage/EventPage/EventLive';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import EventAll from './pages/AdminPage/EventPage/EventAll';
import EventPast from './pages/AdminPage/EventPage/EventPast';
import ManageAccount from './pages/AdminPage/ManageAccount/ManageAccount';
import ChangeAccountInfomation from './pages/AdminPage/ChangeAccountInformation/ChangeAccountInfomation';
import Login from './pages/LoginPage/Login';
import Event from './pages/AdminPage/EventPage/Event';
import PrivateRoute from './helper/PrivateRouter';
import PublicRouter from './helper/PublicRouter';
import EventCenter from './pages/CenterPage/Event/EventCenter';
import EventAllCenter from './pages/CenterPage/Event/EventAllCenter';
import EventLiveCenter from './pages/CenterPage/Event/EventLiveCenter';
import EventPastCenter from './pages/CenterPage/Event/EventPastCenter';
import Team from './pages/CenterPage/Team/Team';
import Member from './pages/CenterPage/Team/Member';
import GiveTasks from './pages/CenterPage/Team/GiveTasks';
import TaskDone from './pages/CenterPage/Team/TaskDone';
import TaskNotDone from './pages/CenterPage/Team/TaskNotDone';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <PublicRouter exact path="/">
          <Login/>
        </PublicRouter>
        <PrivateRoute exact path="/event">
          {sessionStorage.getItem("account_role") === "Admin" && <Event />}
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <EventCenter />}
        </PrivateRoute>
        <PrivateRoute exact path="/event-all">
          {sessionStorage.getItem("account_role") === "Admin" && <EventAll/>}
          {sessionStorage.getItem("account_role") === "DTU Event Center" && <EventAllCenter/>}
        </PrivateRoute>
        <PrivateRoute exact path="/event-future">
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
        <PrivateRoute exact path="/change-accountinfo">
          <ChangeAccountInfomation/>    
        </PrivateRoute>
        <PrivateRoute exact path="/team">
          <Team/>    
        </PrivateRoute>
        <PrivateRoute exact path="/team/member">
          <Member/>    
        </PrivateRoute>
        <PrivateRoute exact path="/team/tasks">
          <GiveTasks/>    
        </PrivateRoute>
        <PrivateRoute exact path="/team/tasks-done">
          <TaskDone/>    
        </PrivateRoute>
        <PrivateRoute exact path="/team/tasks-not-done">
          <TaskNotDone/>    
        </PrivateRoute>
      </Switch>
    </div>
  </Router>
  );
} 

export default App;
