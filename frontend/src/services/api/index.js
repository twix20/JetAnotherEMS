import axios from 'axios';
import { API_URL } from '../../config/urls';
import schoolingEvent from './schoolingEvent';
import account from './account';
import ticket from './ticket';
import tags from './tags';
import file from './file';
import { isTokenExpired } from '../authService';
import { store } from './../../store';
import authActions from '../../actions/authActions';

export let instance = axios.create({
  baseURL: API_URL
});
instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('jwt');

  if (token) {
    const isExpired = isTokenExpired(token);
    if (isExpired) store.dispatch(authActions.tokenExpired());
  }

  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default {
  schoolingEvent,
  account,
  ticket,
  tags,
  file
};
