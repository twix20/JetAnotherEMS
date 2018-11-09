import axios from 'axios';
import { API_URL } from '../../config/urls';
import schoolingEvent from './schoolingEvent';
import account from './account';
import ticket from './ticket';
import tags from './tags';
import file from './file';

export let instance = axios.create({
  baseURL: API_URL
});
instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('jwt');
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
