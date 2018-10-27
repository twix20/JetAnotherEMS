import axios from 'axios';
import schoolingEvent from './schoolingEvent';
import account from './account';
import ticket from './ticket';

export let instance = axios.create();
instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('jwt');
  console.log(token);
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default {
  schoolingEvent,
  account,
  ticket
};
