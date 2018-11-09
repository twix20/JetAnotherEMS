import { instance } from './index';

export default {
  getByEvent: ({ eventId }) => instance.get(`/Ticket/Me/ByEvent/${eventId}`),
  buyTicket: ({ ticketId }) =>
    instance.post(`/Ticket/Me/Buy`, {
      TicketId: ticketId
    }),
  cancelTicket: ({ id }) =>
    instance.post(`/Ticket/Me/Cancel`, {
      UserEventTicketId: id
    }),
  changeStatuses: ({ eventId, userTicketIds, newTicketStatus }) =>
    instance.post(`/Ticket/ChangeStatuses`, {
      EventId: eventId,
      UserEventTicketIds: userTicketIds,
      NewTicketStatus: newTicketStatus
    }),
  changeStatus: ({ eventId, userTicketId, newTicketStatus }) =>
    instance.post(`/Ticket/Reject`, {
      EventId: eventId,
      UserEventTicketId: userTicketId,
      NewTicketStatus: newTicketStatus
    })
};
