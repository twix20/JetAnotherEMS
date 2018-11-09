import { instance } from './index';

export default {
  search: ({ query }) =>
    instance.get(`/Tags/Search`, {
      params: {
        query
      }
    })
};
