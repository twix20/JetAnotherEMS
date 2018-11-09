import { instance } from './index';

export default {
  search: ({ query }) =>
    instance.get(`/api/Tags/Search`, {
      params: {
        query
      }
    })
};
