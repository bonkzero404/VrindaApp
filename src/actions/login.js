/* @flow */
/* global fetch */
import qs from 'qs';

export const USER_DATA = 'USER_DATA';
export const LOGIN_FIELD = 'LOGIN_FIELD';
export const LOGIN_LOADER = 'LOGIN_LOADER';

export const userdata = (user : Object): any => (
  { type: USER_DATA, user }
);

export const loginfield = (field : Object): any => (
  { type: LOGIN_FIELD, field }
);

export const logOut = (callback: any) : any => (
  (dispatch: any => any) => {
    dispatch(userdata({
      valid: false,
    }));
    callback(true);
  }
);

export const loginAction = (username: string, password: string, callback: any => void) : any => (
  (dispatch: any => any) => {
    fetch('http://210.210.178.122:5000/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      // $FlowIgnore: suppressing this error
      body: qs.stringify({
        username,
        password,
      }),
    }).then(response => response.json()).then((responseJson) => {
      dispatch(userdata(responseJson));
      callback(responseJson);
    }).catch((error) => {
      callback(error);
    });
  }
);
