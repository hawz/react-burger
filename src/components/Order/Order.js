import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Order.module.css';

const order = (props) => {

  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>
        {ig.name} ({ig.amount})
    </span>
    );
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        <span>Price: <strong>{props.price.toFixed(2)} €</strong></span>
        <span>
          <Link to={{ pathname: '/orders/' + props.id }}>Details</Link>
          <button onClick={props.clicked}>Delete</button>
        </span>
      </p>
    </div>
  );
};

export default order;
