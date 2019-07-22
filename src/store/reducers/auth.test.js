import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  // default case --> it returns initialState
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  // AUTH_START
  it('should reset the error and set loading to true when authentication starts', () => {
    expect(reducer(
      {
        token: null,
        userId: null,
        error: true,
        loading: false,
        authRedirectPath: '/'
      }, {
        type: actionTypes.AUTH_START
      }
    )).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: true,
      authRedirectPath: '/'
    })
  });

  // AUTH_SUCCESS
  it('should store the token upon login', () => {
    expect(reducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
      }, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'some-token',
        userId: 'some-user-id'
      }
    )).toEqual(
      {
        token: 'some-token',
        userId: 'some-user-id',
        error: null,
        loading: false,
        authRedirectPath: '/'
      }
    );
  });


});
