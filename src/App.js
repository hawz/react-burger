import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import OrderDetails from './containers/Order/Order';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/orders/:id" exact component={OrderDetails} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div >
    );
  }
}

export default App;
