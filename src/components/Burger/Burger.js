import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // first we transform the ingredient object into an array of ingredients
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((value, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if(transformedIngredients.length === 0) {
      transformedIngredients = <p>Your burger is empty. <br /> Start adding ingredients!</p>
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
