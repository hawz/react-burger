import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// PURCHASE BURGER
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

// FETCH ORDERS LIST
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
}

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`/orders.json${queryParams}`)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  }
}

// FETCH SINGLE ORDER
export const fetchOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    selectedOrder: order
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrder = (orderId, token) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = `?auth=${token}`;
    axios.get(`/orders/${orderId}.json${queryParams}`)
      .then(res => {
        const fetchedOrder = {...res.data};
        dispatch(fetchOrderSuccess(fetchedOrder));
      })
      .catch(error => {
        dispatch(fetchOrderFail(error));
      });
  }
};

// DELETE ORDER
export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  }
}

export const deleteOrderSuccess = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    orderId
  }
};

export const deleteOrderFail = (error) => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error
  }
};

export const deleteOrder = (orderId, token) => {
  return dispatch => {
    dispatch(deleteOrderStart());
    axios.delete(`/orders/${orderId}.json?auth=${token}`)
    .then(res => {
      dispatch(deleteOrderSuccess(orderId))
    })
    .catch(error => {
      dispatch(deleteOrderFail(error))
    });
  }
}
