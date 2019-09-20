import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerVisible] = useState(false)

  const sideDrawerOpenHandler = () => {
    setSideDrawerVisible(true);
  }

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false)
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerIsVisible)
  }

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        open={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        showDrawer={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapStateToProps)(Layout);
