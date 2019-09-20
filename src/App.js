import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import OrderDetails from './containers/Order/Order';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const App = props => {
  useEffect(() => {
    console.log('called hook');
    props.onTryAutoSignup();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
          </Suspense>
        )} />
        <Route path="/orders" exact render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Orders />
          </Suspense>
        )} />
        <Route path="/orders/:id" exact component={OrderDetails} />
        <Route path="/logout" render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Logout />
          </Suspense>
        )} />
        <Route path="/auth" render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
        )} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div >
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
