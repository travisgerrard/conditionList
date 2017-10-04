import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class Greetings extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to the VM Resident Homepage</h1>
        <p>If you havn't already <ActiveLink activeOnlyWhenExact to="/signup" label="Sign Up" />, otherwise <ActiveLink activeOnlyWhenExact to="/login" label="Login" /></p>        
      </div>
    );
  }

}

export default Greetings;
