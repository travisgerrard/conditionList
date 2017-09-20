import React, { Component } from 'react';
//import { Redirect, Link, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends Component {

    componentWillMount() {
      this.props.history.push('/');
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }

  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps)(Authenticate);
}
