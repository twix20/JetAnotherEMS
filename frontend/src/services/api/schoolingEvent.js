import { instance } from './index';

export default {
  getFeaturedEvents: ({ page, pageSize, ...filter }) =>
    instance.get(`/SchoolingEvent/Featured`, {
      params: {
        page,
        pageSize,
        ...filter
      }
    }),
  getEvent: ({ id }) => instance.get(`/SchoolingEvent/${id}`),
  getSchedule: ({ id }) => instance.get(`/SchoolingEvent/${id}/Schedule`),
  getParticipants: ({ id }) =>
    instance.get(`$/SchoolingEvent/${id}/Participants`),
  getAvailableTickets: ({ id }) =>
    instance.get(`/SchoolingEvent/${id}/Tickets`),
  create: payload => instance.post(`/SchoolingEvent`, payload),
  update: payload => instance.patch(`/SchoolingEvent`, payload),
  changeSchoolingEventFollow: ({ eventId, newFollowStatus }) =>
    instance.post(`/SchoolingEvent/ChangeSchoolingEventFollow`, {
      eventId,
      IsFollowing: newFollowStatus
    })
};
