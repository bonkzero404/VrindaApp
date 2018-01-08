/* @flow */
/* global fetch */
/* eslint quote-props: 0 */
import qs from 'qs';

export const DEVICE_LIST = 'DEVICE_LIST';
export const DEVICE_LIST_LOADER = 'DEVICE_LIST_LOADER';
export const LOADING_SWITCH = 'LOADING_SWITCH';
export const SELECTED_ITEM = 'SELECTED_ITEM';
export const DEVICE_STAT = 'DEVICE_STAT';

export const devicelist = (device : Object): any => (
  { type: DEVICE_LIST, device }
);

export const loading = (isloading : bool): any => (
  { type: DEVICE_LIST_LOADER, isloading }
);

export const loadingSwitch = (isLoadingSwitch : bool): any => (
  { type: LOADING_SWITCH, isLoadingSwitch }
);

export const itemSelected = (selected : Object): any => (
  { type: SELECTED_ITEM, selected }
);

export const statDevice = (stat : Object): any => (
  { type: DEVICE_STAT, stat }
);

export const getDeviceList = () : any => (
  (dispatch: any => any, getState: any) => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    if (state.devicelist.device || state.devicelist.device.valid === false) {
      return fetch('http://localhost:5000/api/device/list', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json()).then((responseJson) => {
        dispatch(devicelist(responseJson));
      }).catch((error) => {
        dispatch(devicelist(error));
      });
    }

    return state.devicelist;
  }
);

export const reloadDeviceList = () : any => (
  (dispatch: any => any, getState: any) => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    return fetch('http://localhost:5000/api/device/list', {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    }).then(response => response.json()).then((responseJson) => {
      dispatch(devicelist(responseJson));
    }).catch((error) => {
      dispatch(devicelist(error));
    });
  }
);

export const sendCommand = (id: string, cmd: string, callback: any => void) : any => (
  (dispatch: any => any, getState: any) => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    dispatch(itemSelected({
      loading: true,
      id,
      cmd,
    }));

    fetch('http://localhost:5000/api/switch/cmd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': token,
      },
      // $FlowIgnore: suppressing this error
      body: qs.stringify({
        deviceId: id,
        cmd,
      }),
    }).then(response => response.json()).then((responseJson) => {
      dispatch(itemSelected({
        loading: false,
        id,
        cmd,
      }));
      callback(responseJson);
    }).catch((error) => {
      callback(error);
    });
  }
);

export const getStat = (id: string) : any => (
  (dispatch: any => any, getState: any) => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    dispatch(statDevice({
      [id]: 'off',
    }));

    fetch('http://localhost:5000/api/switch/cmd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': token,
      },
      // $FlowIgnore: suppressing this error
      body: qs.stringify({
        deviceId: id,
        cmd: 'info',
      }),
    }).then(response => response.json()).then((responseJson) => {
      if (responseJson.valid === true) {
        dispatch(statDevice({
          [id]: responseJson.data.stat,
        }));
      } else {
        dispatch(statDevice({
          [id]: 'off',
        }));
      }
    }).catch(() => {
      dispatch(statDevice({
        [id]: 'off',
      }));
    });
  }
);
