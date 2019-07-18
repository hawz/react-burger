import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders.length) {
        orders = this.props.orders.map(order => {
          return (
            <Order
            key={order.id}
            id={order.id}
            ingredients={order.ingredients}
            clicked={() => this.props.onDeleteOrder(order.id)}
            price={+order.price} />
          );
        });
      } else {
        orders = (<h1 style={{
          textAlign: 'center'
        }}>No orders here!</h1>)
      }

    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
