/* @flow */
// Types ListData
export type DeviceListAct = { type: 'DEVICE_LIST', device: Object };
export type DeviceListLoaderAct = { type: 'DEVICE_LIST_LOADER', isloading: boolean };
export type LoadingSwitchAct = { type: 'LOADING_SWITCH', isLoadingSwitch: boolean };
export type SelectedItemAct = { type: 'SELECTED_ITEM', selected: Object };
export type DeviceStatAct = { type: 'DEVICE_STAT', stat: Object };

// Types Login
export type UserDataAct = { type: 'USER_DATA', user: Object };
export type LoginFieldAct = { type: 'LOGIN_FIELD', field: Object };
export type LoginLoaderAct = { type: 'LOGIN_FIELD', isLoading: boolean };
