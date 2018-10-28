using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface IUserSchoolingEventTicketService
    {
        Task<UserSchoolingEventTicketViewModel> GetEventTicketForUser(Guid userId, Guid eventId);
        Task BuyTicket(BuyEventTicketViewModel viewModel);
    }
}
