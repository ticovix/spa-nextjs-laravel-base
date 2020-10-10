import api from './api';
import useFetch from 'hooks/useFetch';

export const getUsers = () => useFetch('users');

export const getUser = (userId) => useFetch(userId ? `users/${userId}` : null);

export const create = (user) => api().post('users', user);

export const update = (user) => api().put(`users/${user.id}`, user);

export const uploadAvatar = (userId, photo) => {
  const formData = new FormData();
  formData.append('photo', photo);

  return api().post(`users/${userId}/avatar`, formData);
};

export const deleteAvatar = (userId) => api().delete(`users/${userId}/avatar`);

export const remove = (userId) => api().delete(`users/${userId}`);
