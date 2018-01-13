import type {
  UserDataAct,
  LoginFieldAct,
  LoginLoaderAct,
} from '../configs/typesact';

type Action =
  | UserDataAct
  | LoginFieldAct;

const initialState = {
  user: {},
  field: {
    username: '',
    password: '',
  },
  isLoading: false,
};

export default function (state = initialState, action: Action): any {
  if (action.type === 'USER_DATA') {
    return {
      ...state,
      user: action.user,
    };
  } else if (action.type === 'LOGIN_FIELD') {
    return {
      ...state,
      field: Object.assign({}, state.field, action.field),
    };
  } else if (action.type === 'LOGIN_LOADER') {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }
  return state;
}
