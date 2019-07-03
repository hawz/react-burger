import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <nav className={classes.NavigationItems}>
    <ul>
      <NavigationItem link="/" active>Burger Builder</NavigationItem>
      <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
  </nav>
);

export default navigationItems;
