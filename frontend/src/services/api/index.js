import axios from 'axios';
import schoolingEvent from './schoolingEvent';

export const instance = axios.create();

export default {
  schoolingEvent
};
