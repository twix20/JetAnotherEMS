import { instance } from './index';

export default {
  postLogin: ({ email, password, rememberMe }) =>
    instance.post(`/Account/Login`, {
      Email: email,
      Password: password,
      RememberMe: rememberMe
    }),
  postRegister: ({ email, password, confirmPassword, account }) =>
    instance.post(`/Account/Register`, {
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      Type: account
    })
};
