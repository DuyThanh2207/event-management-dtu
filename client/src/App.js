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

function App() {
  console.log(sessionStorage.getItem("loggedIn"));
  return (
    <Router>
    <div>
      <Switch>
        <PublicRouter exact path="/">
          <Login/>
        </PublicRouter>
        <PrivateRoute exact path="/event">
          <Event />
        </PrivateRoute>
        <PrivateRoute exact path="/event/event-all">
          <EventAll/>   
        </PrivateRoute>
        <PrivateRoute exact path="/event/event-live">
          <EventLive/>    
        </PrivateRoute>
        <PrivateRoute exact path="/event/event-past"> 
          <EventPast/>
        </PrivateRoute>
        <PrivateRoute exact path="/manage-account">
          <ManageAccount/>
        </PrivateRoute>
        <PrivateRoute exact path="/change-password">
          <ChangeAccountInfomation/>    
        </PrivateRoute>
      </Switch>
    </div>
  </Router>
  );
} 

export default App;
