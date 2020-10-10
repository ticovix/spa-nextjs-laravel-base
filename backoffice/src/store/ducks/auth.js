import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';
import add from 'date-fns/add';
import getUnixTime from 'date-fns/getUnixTime';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const { Types, Creators } = createActions({
  setLoading: ['isLoading'],
  signIn: ['userToken', 'remember'],
  signOut: ['isAuthenticated'],
  setUserData: ['userData'],
  login: (user) => ({
    type: 'LOGIN',
    user,
  }),
  logout: (userToken) => ({
    type: 'LOGOUT',
    userToken,
  }),
  refreshToken: (userToken) => ({
    type: 'REFRESH_TOKEN',
    userToken,
  }),
});

const INITIAL_STATE = {
  isLoading: false,
  isAuthenticated: false,
  userToken: null,
  refreshTokenAt: null,
  userData: {},
  remember: false,
};

const setLoading = (state = INITIAL_STATE, action) => {
  return { ...state, isLoading: action.isLoading };
};

const signIn = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    userToken: action.userToken,
    isAuthenticated: true,
    remember: action.remember || false,
    refreshTokenAt: getUnixTime(
      add(new Date(), {
        minutes: publicRuntimeConfig.api.minutesToRefreshToken,
      })
    ),
  };
};

const signOut = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

const setUserData = (state = INITIAL_STATE, action) => {
  let userData = Object.assign(state.userData, action.userData);

  return { ...state, userData };
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_OUT]: signOut,
  [Types.SET_USER_DATA]: setUserData,
});
