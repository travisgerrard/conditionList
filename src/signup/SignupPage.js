import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../actions/signupActions';
import { Redirect } from 'react-router-dom';

class SignUpPage extends Component {

  state = {
    redirect: false
  }

  userSignupRequest = ({ username }) => {
    return this.props.userSignupRequest({ username }).then(
      () => {

        this.setState({ redirect: true })},
    );
  }

  render() {
    const { isUserExists } = this.props;
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <SignupForm
            userSignupRequest={this.userSignupRequest}
            isUserExists={isUserExists}
          />
        }
      </div>
    );
  }
}

export default connect(null, { userSignupRequest, isUserExists })(SignUpPage);
