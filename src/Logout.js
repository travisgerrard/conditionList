import React, { Component } from 'react'
import { logout } from './actions/authActions';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

//import * as authActionCreators from '../actions/auth'

class LogoutPage extends Component {

  componentWillMount() {
    this.props.logout();
  }

  render() {
    return(
      <div>
        <Redirect to="/"/>
      </div>
    )
  }

}

export default withRouter(connect(null, { logout })(LogoutPage))
