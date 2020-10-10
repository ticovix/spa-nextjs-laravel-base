import api from './api';

export const signIn = (user) => api().post('login', { ...user });

export const signOut = () => api().post('logout');

export const refreshToken = (remember) =>
  api().post('refresh-token', { remember });
