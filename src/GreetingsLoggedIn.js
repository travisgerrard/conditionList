import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class GreetingsLoggedIn extends Component {

  render() {
    return (
      <div>
        <h1>This is the logged in homepage</h1>
          <ActiveLink activeOnlyWhenExact to="/hemeonc" label="Heme-Onc" />
          <br />
          <ActiveLink activeOnlyWhenExact to="/derm" label="Derm" />
          <br />
          <ActiveLink activeOnlyWhenExact to="/cardiology" label="Cardiology" />
      </div>
    );
  }

}

export default GreetingsLoggedIn;
