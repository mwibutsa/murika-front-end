import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Layout from './hoc/Layout/Layout';
const asyncSignup = asyncComponent(() => {
  return import('./containers/Auth/Signup.jsx')
})
const asyncLogin = asyncComponent(() => {
  return import('./containers/Auth/Login.jsx')
})

class App extends Component {
  render() {
    let routes = (
      <Switch>
        
        <Route path="/login" component={ asyncLogin } />
        <Route path="/auth" component={ asyncSignup } />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated || this.props.isAuth) {
      routes = (
        <Switch>
         
          <Route path="/login" component={ asyncLogin } />
          <Route path="/auth" component={ asyncSignup } />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.signup.token !== null,
    isAuthenticated: state.login.token !== null
  };
};



export default withRouter(connect(mapStateToProps)(App));