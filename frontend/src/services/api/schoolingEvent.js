import { instance } from './index';

const URL_HOST = 'https://localhost:44364';
//TODO: move url to config/env variable
export default {
  getFeaturedEvents: ({ page, pageSize, ...filter }) =>
    instance.get(`${URL_HOST}/api/SchoolingEvent/Featured`, {
      params: {
        page,
        pageSize,
        ...filter
      }
    }),
  getEvent: ({ id }) => instance.get(`${URL_HOST}/api/SchoolingEvent/${id}`),
  getSchedule: ({ id }) =>
    instance.get(`${URL_HOST}/api/SchoolingEvent/${id}/Schedule`),
  getParticipants: ({ id }) =>
    instance.get(`${URL_HOST}/api/SchoolingEvent/${id}/Participants`),
  create: payload => instance.post(`${URL_HOST}/api/SchoolingEvent`, payload),
  update: payload => instance.patch(`${URL_HOST}/api/SchoolingEvent`, payload)
};
