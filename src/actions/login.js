/* @flow */
import qs from 'qs';
import api from '../configs/api';
import type {
  UserDataAct,
  LoginFieldAct,
} from '../configs/typesact';

type Action =
  | UserDataAct
  | LoginFieldAct;

declare function fetch (a: string, b: Object): Promise<*>;
type ThunkAction = (dispatch: Dispatch) => any;
type Dispatch = (action: Action | ThunkAction) => any;

export const userdata = (user : Object): Action => (
  { type: 'USER_DATA', user }
);

export const loginfield = (field : Object): Action => (
  { type: 'LOGIN_FIELD', field }
);

export const logOut = (callback: (a: boolean) => any): ThunkAction => (
  (dispatch: Dispatch): any => {
    dispatch(userdata({
      valid: false,
    }));
    callback(true);
  }
);

export const loginAction = (username: string, password: string, callback: any => void) : any => (
  (dispatch: Dispatch): any => {
    fetch(`${api.apiUrl}api/user/auth`, {
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
