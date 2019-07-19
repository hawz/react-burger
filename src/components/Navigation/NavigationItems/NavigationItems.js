import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <nav className={classes.NavigationItems}>
    <ul>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {props.isAuthenticated
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authenticate</NavigationItem>
      }
    </ul>
  </nav>
);

export default navigationItems;
