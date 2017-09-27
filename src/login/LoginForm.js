import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import classnames from 'classnames';
import validateInput from '../validations/login';

class LoginForm extends Component {

  state = {
    identifier: '',
    errors: {},
    isLoading: false
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({
        errors
      });
    }

    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      const { identifier, password } = this.state
      this.setState({
        errors: {},
        isLoading: true
      });
      this.props.login({ identifier, password })
        .catch((errors) => errors.response.json().then(({errors}) => this.setState({ errors, loading: false }))
      );
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors, identifier/*, password, isLoading */ } = this.state;
    return (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}


        <TextFieldGroup
          field="identifier"
          label="Username"
          value={identifier}
          error={errors.identifier}
          onChange={this.handleChange}
        />

        <div className="field">
          <button className="ui primary button">Login</button>
        </div>

      </form>
    );
  }

}

export default LoginForm;
