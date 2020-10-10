import React, {
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from 'store/ducks/auth';
import getUnixTime from 'date-fns/getUnixTime';
import getConfig from 'next/config';
import Error from 'components/Errors/NotAuthorized';

const AuthContext = createContext({});
const { publicRuntimeConfig } = getConfig();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const isAuthenticated = authReducer.isAuthenticated;
  const refreshTokenAt = authReducer.refreshTokenAt;
  const isLoading = authReducer.isLoading;
  const userToken = authReducer.userToken;
  const user = authReducer.userData;

  const minutesToRefresh = publicRuntimeConfig.api.minutesToRefreshToken;
  const intervalSeconds = 60000 * minutesToRefresh;

  useEffect(() => {
    if (isAuthenticated) refreshToken();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshToken();
      }, intervalSeconds);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshTokenAt]);

  const refreshToken = useCallback(() => {
    let now = getUnixTime(new Date());
    if (now >= refreshTokenAt) {
      dispatch(Creators.refreshToken());
    }
  }, [refreshTokenAt]);

  const login = (user) => {
    dispatch(Creators.login(user));
  };

  const logout = () => {
    dispatch(Creators.logout());
  };

  const updateUser = (user) => {
    dispatch(Creators.setUserData(user));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userToken,
        isLoading,
        user,
        login,
        logout,
        refreshToken,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export const ProtectRoute = (Component) => {
  return () => {
    const authenticated = useSelector(
      (state) => state.authReducer.isAuthenticated
    );

    useEffect(() => {
      if (!authenticated) Router.replace('/login');
    }, [authenticated]);

    if (!authenticated) return <Error />;

    return <Component {...arguments} />;
  };
};
