import api from './api';

export const changePassword = ({
  old_password,
  password,
  password_confirmation,
}) =>
  api().patch(`account/password`, {
    old_password,
    password,
    password_confirmation,
  });

export const changeProfile = (data) => api().put('account', data);

export const profile = () => api().get('account');

export const uploadAvatar = (photo) => {
  const formData = new FormData();
  formData.append('photo', photo);

  return api().post(`account/avatar`, formData);
};

export const deleteAvatar = () => api().delete(`account/avatar`);
