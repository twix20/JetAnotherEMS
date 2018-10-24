import { instance } from './index';

const URL_HOST = 'https://localhost:44364';

//TODO: move url to config/env variable
export default {
  postLogin: ({ email, password, rememberMe }) =>
    instance.post(`${URL_HOST}/api/Account/Login`, {
      Email: email,
      Password: password,
      RememberMe: rememberMe
    }),
  postRegister: ({ email, password, confirmPassword, account }) =>
    instance.post(`${URL_HOST}/api/Account/Register`, {
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      Type: account
    })
};
