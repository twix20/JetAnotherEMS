import { instance } from './index';
import { API_URL } from '../../config/urls';

export default {
  downloadAllAttachmentsUrl: ({ id }) =>
    `${API_URL}/SchoolingEvent/${id}/DownloadAllAttachments`,
  downloadCalendarUrl: ({ id }) => `${API_URL}/SchoolingEvent/${id}/Calendar`,
  getFeaturedEvents: ({ page, pageSize, sort, ...filter }) =>
    instance.get(`/SchoolingEvent/Featured`, {
      params: {
        page,
        pageSize,
        sort,
        ...filter
      }
    }),
  getEvent: ({ id }) => instance.get(`/SchoolingEvent/${id}`),
  getSchedule: ({ id }) => instance.get(`/SchoolingEvent/${id}/Schedule`),
  getParticipants: ({ id }) =>
    instance.get(`/SchoolingEvent/${id}/Participants`),
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
