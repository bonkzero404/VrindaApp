import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { routerReducer } from 'react-router-redux';

import userdata from './userdata';
import devicelist from './devicelist';

const config = {
  key: 'root',
  storage,
};

export default persistCombineReducers(config, {
  userdata,
  devicelist,
  router: routerReducer,
});
