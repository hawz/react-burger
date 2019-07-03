import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  // ... here we gotta add / remove css class to show / hide the side drawer
  const sideDrawerClass = props.showDrawer ? classes.Open : classes.Close;
  return (
    <Aux>
      <Backdrop
        show={props.showDrawer}
        clicked={props.closed}/>
      <div className={[classes.SideDrawer, sideDrawerClass].join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </Aux>
  );
};

export default sideDrawer;
