import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {

  state = {
    redirect: false
  }

  login = ({ identifier }) => {
    return this.props.login({ identifier }).then(
      () => {
      this.setState({ redirect: true })},
    );
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <LoginForm
            login={this.login}
          />
        }
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);
