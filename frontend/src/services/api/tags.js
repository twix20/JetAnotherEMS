import { instance } from './index';

const URL_HOST = 'https://localhost:44364';
//TODO: move url to config/env variable

export default {
  search: ({ query }) =>
    instance.get(`${URL_HOST}/api/Tags/Search`, {
      params: {
        query
      }
    })
};
