import React, { Component } from 'react';
import './App.css';
//import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { logout } from './actions/authActions';
import requireAuth from './utils/requireAuth';
import ConditionList from './ConditionList.js';
import Greetings from './Greetings';
import SignUpPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';

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
        <ActiveLink activeOnlyWhenExact to="/condition" label="Condition" />
        <a className="item" href="logsOut" onClick={this.logout}>Logout</a>
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
              <ConditionList />
            ): (
              <Greetings />
            )
        )}/>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/condition" component={requireAuth(ConditionList)} />


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
