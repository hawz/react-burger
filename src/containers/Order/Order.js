import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';

import classes from './Order.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const OrderDetails = props => {
  const { onFetchSelectedOrder, match, token } = props;

  useEffect(() => {
    onFetchSelectedOrder(match.params.id, token);
  }, [onFetchSelectedOrder, match, token]);


  let order = <Spinner />;
  if (!props.loading && props.selectedOrder) {

    const ingredients = [];
    for (let ingredientName in props.selectedOrder.ingredients) {
      ingredients.push({ name: ingredientName, amount: props.selectedOrder.ingredients[ingredientName] })
    }

    const orderDetails = [];
    for (let detailName in props.selectedOrder.orderData) {
      orderDetails.push({ name: detailName, value: props.selectedOrder.orderData[detailName] });
    }

    const ingredientOutput = ingredients.map(ig => {
      return (
        <span
          key={ig.name}
          className={classes.Ingredient}
        >
          {ig.name} ({ig.amount})
          </span>
      );
    });

    const orderDetailsOutput = orderDetails.map(od => (
      <Aux key={od.name}>
        <dt>{od.name}</dt>
        <dd>{od.value}</dd>
      </Aux>
    ));

    order = (
      <Aux>
        <h1>Your burger</h1>
        <p>Price: <strong>{props.selectedOrder.price.toFixed(2)} €</strong></p>
        <hr />
        <p>Ingredients: {ingredientOutput}</p>
        <hr />
        <p>More details:</p>
        <dl className={classes.DetailsList}>
          {orderDetailsOutput}
        </dl>
      </Aux>
    );
  }
  return (
    <div className={classes.Order}>
      {order}
    </div>
  )

}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    selectedOrder: state.order.selectedOrder,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSelectedOrder: (orderId, token) => dispatch(actions.fetchOrder(orderId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderDetails, axios));
