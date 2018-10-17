import { instance } from './index';

const URL_HOST = 'https://localhost:44364';
//TODO: move url to config/env variable
export default {
  getFeaturedEvents: ({ page, pageSize }) =>
    instance.get(`${URL_HOST}/api/SchoolingEvent/Featured`, {
      params: {
        page,
        pageSize
      }
    }),
  getEvent: ({ id }) => instance.get(`${URL_HOST}/api/SchoolingEvent/${id}`),
  getSchedule: ({ id }) =>
    instance.get(`${URL_HOST}/api/SchoolingEvent/Schedule/${id}`)
};
