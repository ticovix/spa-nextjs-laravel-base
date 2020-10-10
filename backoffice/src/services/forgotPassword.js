import api from './api';

export const sendEmail = (email) => api().post('reset-password', { email });

export const resetPassword = ({
  token,
  email,
  password,
  password_confirmation,
}) =>
  api().put(`reset-password`, {
    email,
    password,
    password_confirmation,
    token,
  });
