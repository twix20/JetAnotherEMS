import { instance } from './index';

const URL_HOST = 'https://localhost:44364';
//TODO: move url to config/env variable

export default {
  getByEvent: ({ eventId }) =>
    instance.get(`${URL_HOST}/api/Ticket/Me/ByEvent/${eventId}`),
  buyTicket: ({ ticketId }) =>
    instance.post(`${URL_HOST}/api/Ticket/Me/Buy`, {
      TicketId: ticketId
    }),
  cancelTicket: ({ id }) =>
    instance.post(`${URL_HOST}/api/Ticket/Me/Cancel`, {
      UserEventTicketId: id
    }),
  approveTickets: ({ eventId, userTicketIds }) =>
    instance.post(`${URL_HOST}/api/Ticket/Approve`, {
      EventId: eventId,
      UserSchoolingEventTicketIdsToApprove: userTicketIds
    }),
  rejectTickets: ({ eventId, userTicketIds }) =>
    instance.post(`${URL_HOST}/api/Ticket/Reject`, {
      EventId: eventId,
      UserSchoolingEventTicketIdsToReject: userTicketIds
    })
};
