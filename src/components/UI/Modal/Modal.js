import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== props.show || nextProps.children !== props.children;
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Aux>
  );

}

// In a functional component we can't have the shouldComponentUpdate method,
// so we have to use React.memo and pass as second argument to that the
// updating criteria as a function, basically the same comparison we had inside
// the previous shouldComponentUpdate method... BUT WE HAVE TO INVERT THE LOGIC!!

// That's because in ShouldComponentUpdate we check whether or not the component
// should update, so if the new props are different from the old ones. Now we must
// specify the conditions on which React.memo would keep track of the component, so
// it has to remember the same component if the new props are equal to the old ones

// basically, in ShouldComponentUpdate we had
// nextProps.show !== prevProps.show || nextProps.children !== prevProps.children

// now with React.memo we have
// nextProps.show === prevProps.show && nextProps.children === prevProps.children

export default React.memo(
  Modal,
  (prevProps, nextProps)  =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  );
