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
        <h1>Document a condition you saw in one of the following categories.</h1>
        <ActiveLink activeOnlyWhenExact to="/hemeonc" label="Heme-Onc" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/derm" label="Derm" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/cardiology" label="Cardiology" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/endocrine" label="Endocrine" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/gi" label="GI" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/id" label="Infectious Disease" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/nephro" label="Nephrology" />
        <br />
        <ActiveLink activeOnlyWhenExact to="/gim" label="GIM" />
      </div>
    );
  }

}

export default GreetingsLoggedIn;
