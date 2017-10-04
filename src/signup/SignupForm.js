import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';


class SignupForm extends Component {
  state = {
    username: '',
    errors: {},
    isLoading: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
        this.props.isUserExists(val)
          .then(res => res.json())
          .then(data => {
            let errors = this.state.errors;
            if(data.existingUser.username) {
              errors[field] = 'There is user with such ' + field;
            } else {
              errors[field] = '';
            }
            this.setState({ errors });
          })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    this.setState({ errors });
    const isValid = this.isValid();

    if (isValid) {
      const { username, email, password, passwordConfirmation } = this.state
      this.setState({ loading: true });
      this.props.userSignupRequest({ username, email, password, passwordConfirmation })
        .catch((errors) => errors.response.json().then(({errors}) => this.setState({ errors, loading: false }))
      );
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Sign up</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <TextFieldGroup
          error={this.state.errors.username}
          label="Username"
          onChange={this.handleChange}
          value={this.state.username}
          field="username"
        />

        <div className="field">
          <button className="ui primary button">Sign up</button>
        </div>

      </form>
    )
    return (
      <div>
        { form }
      </div>
    );
  }
}

export default SignupForm;
