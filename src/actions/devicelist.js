/* @flow */
/* eslint quote-props: 0 */
import qs from 'qs';
import api from '../configs/api';
import type {
  DeviceListAct,
  DeviceListLoaderAct,
  LoadingSwitchAct,
  SelectedItemAct,
  DeviceStatAct,
} from '../configs/typesact';

type Action =
  | DeviceListAct
  | DeviceListLoaderAct
  | LoadingSwitchAct
  | SelectedItemAct
  | DeviceStatAct;

type State = {
  userdata: {
    user: {
      data: {
        accessToken: string,
      }
    }
  },
  devicelist: {
    device: {
      valid: boolean,
    }
  },
};

declare function fetch (a: string, b: Object): Promise<*>;
type GetState = () => State;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction) => any;

export const devicelist = (device: Object): Action => (
  { type: 'DEVICE_LIST', device }
);

export const loading = (isloading : boolean): Action => (
  { type: 'DEVICE_LIST_LOADER', isloading }
);

export const loadingSwitch = (isLoadingSwitch : boolean): Action => (
  { type: 'LOADING_SWITCH', isLoadingSwitch }
);

export const itemSelected = (selected : Object): Action => (
  { type: 'SELECTED_ITEM', selected }
);

export const statDevice = (stat : Object): Action => (
  { type: 'DEVICE_STAT', stat }
);

export const getDeviceList = (): ThunkAction => (
  (dispatch: Dispatch, getState: GetState): any => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    if (state.devicelist.device && state.devicelist.device.valid === false) {
      fetch(`${api.apiUrl}api/device/list`, {
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

export const reloadDeviceList = (): ThunkAction => (
  (dispatch: Dispatch, getState: GetState): any => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    return fetch(`${api.apiUrl}api/device/list`, {
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

export const sendCommand = (id: string, cmd: string, callback: any => void): ThunkAction => (
  (dispatch: Dispatch, getState: GetState): any => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    dispatch(itemSelected({
      loading: true,
      id,
      cmd,
    }));

    fetch(`${api.apiUrl}api/switch/cmd`, {
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

export const getStat = (id: string): ThunkAction => (
  (dispatch: Dispatch, getState: GetState): any => {
    const state = getState();
    const token = state.userdata.user.data.accessToken;

    dispatch(statDevice({
      [id]: 'off',
    }));

    fetch(`${api.apiUrl}api/switch/cmd`, {
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
