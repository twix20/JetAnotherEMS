import { instance } from './index';

const URL_HOST = 'https://localhost:44364';
//TODO: move url to config/env variable

export default {
  getByEvent: ({ eventId }) =>
    instance.get(`${URL_HOST}/api/Ticket/ByEvent/${eventId}`),
  buyTicket: ({ ticketId }) =>
    instance.post(`${URL_HOST}/api/Ticket/Buy`, {
      payload: {
        ticketId
      }
    })
};
