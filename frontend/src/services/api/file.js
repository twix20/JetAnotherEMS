import { instance } from './index';

export default {
  download: ({ id }) =>
    instance.get(`/File/${id}/Download`, {
      headers: {
        responseType: 'blob' // important
      }
    })
};
