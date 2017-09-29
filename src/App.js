import React, { Component } from 'react';
import './App.css';
//import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { logout } from './actions/authActions';
import requireAuth from './utils/requireAuth';
import ConditionList from './ConditionList.js';
import ConditionListDerm from './ConditionListDerm.js';
import DermTerm from './DermTerm.js';
import GreetingsNotLoggedIn from './Greetings';
import GreetingsLoggedIn from './GreetingsLoggedIn';
import SignUpPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import Logout from './Logout';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);


class App extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div className="right menu">
        <ActiveLink activeOnlyWhenExact to="/hemeonc" label="Heme-Onc" />
        <ActiveLink activeOnlyWhenExact to="/derm" label="Derm" />
        <ActiveLink activeOnlyWhenExact to="/dermTerm" label="Derm-Term" />
        <ActiveLink activeOnlyWhenExact to="/logout" label="Logout" />
      </div>
    );

    const guestLinks = (
      <div className="right menu">
        <ActiveLink activeOnlyWhenExact to="/signup" label="Sign Up" />
        <ActiveLink activeOnlyWhenExact to="/login" label="Login" />
      </div>
    );

    return (
      <div className="ui container">
        <div className="ui mini menu">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          { isAuthenticated ? userLinks : guestLinks }
        </div>

        <Route exact path="/" render={() => (
            isAuthenticated ? (
              <GreetingsLoggedIn />
            ): (
              <GreetingsNotLoggedIn />
            )
        )}/>

        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/hemeonc" render={()=> isAuthenticated ? <ConditionList pageTitle="HemeOnc"/> : <GreetingsNotLoggedIn />} />
        <Route path="/derm" render={()=> isAuthenticated ? <ConditionList pageTitle="Derm"/> : <GreetingsNotLoggedIn />} />
        <Route path="/dermTerm" component={requireAuth(DermTerm)} />
        <Route path="/logout" component={requireAuth(Logout)} />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps, { logout })(App));
