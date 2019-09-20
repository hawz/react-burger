import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
  const { onFetchOrders, token, userId } = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId])

  let orders = <Spinner />;
  if (!props.loading) {
    if (props.orders.length) {
      orders = props.orders.map(order => {
        return (
          <Order
            key={order.id}
            id={order.id}
            ingredients={order.ingredients}
            clicked={() => props.onDeleteOrder(order.id, props.token)}
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

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (orderId, token) => dispatch(actions.deleteOrder(orderId, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
