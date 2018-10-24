import axios from 'axios';
import schoolingEvent from './schoolingEvent';
import account from './account';

export const instance = axios.create();

export default {
  schoolingEvent,
  account
};
