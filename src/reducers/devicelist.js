import {
  DEVICE_LIST,
  DEVICE_LIST_LOADER,
  SELECTED_ITEM,
  DEVICE_STAT,
} from '../actions/devicelist';

const initialState = {
  device: {
    valid: false,
  },
  selected: {
    loading: false,
    id: null,
    cmd: null,
  },
};

export default function (state = initialState, action) {
  if (action.type === DEVICE_LIST) {
    return {
      ...state,
      device: action.device,
    };
  } else if (action.type === DEVICE_LIST_LOADER) {
    return {
      ...state,
      isloading: action.isloading,
    };
  } else if (action.type === SELECTED_ITEM) {
    return {
      ...state,
      selected: action.selected,
    };
  } else if (action.type === DEVICE_STAT) {
    return {
      ...state,
      stat: action.stat,
    };
  }

  return state;
}
