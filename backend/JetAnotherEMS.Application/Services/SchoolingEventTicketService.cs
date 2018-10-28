using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Services
{
    public class SchoolingEventTicketService : ISchoolingEventTicketService
    {
        private readonly ISchoolingEventTicketRepository _schoolingEventTicketRepository;

        public SchoolingEventTicketService(ISchoolingEventTicketRepository schoolingEventTicketRepository)
        {
            _schoolingEventTicketRepository = schoolingEventTicketRepository;
        }

        public Task<SchoolingEventTicket> GetById(Guid id)
        {
            return _schoolingEventTicketRepository.GetById(id);
        }
    }
}
