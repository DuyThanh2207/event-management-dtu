import React from 'react';
import EventLive from './pages/AdminPage/EventPage/EventLive';
import Header from './components/AdminPage/Header/Header';
import NavbarEvent from './components/AdminPage/Event/NavbarEvent';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import EventAll from './pages/AdminPage/EventPage/EventAll';
import EventPast from './pages/AdminPage/EventPage/EventPast';
import NavbarManageAccount from './components/AdminPage/ManageAccount/NavbarManageAccount';
import ManageAccount from './pages/AdminPage/ManageAccount/ManageAccount';
import NavbarChangeAccount from './components/AdminPage/ChangeAccountInformation/NavbarChangeAccount';
import ChangeAccountInfomation from './pages/AdminPage/ChangeAccountInformation/ChangeAccountInfomation';
import Footer from './components/AdminPage/Footer/Footer';
import Login from './pages/LoginPage/Login';
import HeaderLogin from './components/LoginPage/HeaderLogin';
function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <HeaderLogin/>
          <Login/>
          <Footer/>
        </Route>
        <Route exact path="/event">
          <Header/>
          <NavbarEvent/>
          <Footer/>
        </Route>
        <Route exact path="/event/event-all">
          <Header/>
          <NavbarEvent/>
          <EventAll/>
          <Footer/>
        </Route>
        <Route exact path="/event/event-live">
          <Header/>
          <NavbarEvent/>
          <EventLive/>
          <Footer/>
        </Route>
        <Route exact path="/event/event-past">
          <Header/>
          <NavbarEvent/>
          <EventPast/>
          <Footer/>
        </Route>
        <Route exact path="/manage-account">
          <Header/>
          <NavbarManageAccount/>
          <ManageAccount/>
          <Footer/>
        </Route>
        <Route exact path="/change-password">
          <Header/>
          <NavbarChangeAccount/>
          <ChangeAccountInfomation/>
          <Footer/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
} 

export default App;
