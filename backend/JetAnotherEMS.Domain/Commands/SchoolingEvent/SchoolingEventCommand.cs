using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class SchoolingEventCommand : Command
    {
        public string Title { get; set; }

        public string Description { get; set; }

        //public GoogleMapsAddress Location { get; set; }

        public string Location { get; set; }

        public ICollection<SchoolingEventDay> Calendar { get; set; }

        public ICollection<SchoolingEventTicket> Tickets { get; set; }

        //TODO: add more members

        public SchoolingEventCommand(
            string title,
            string description,
            string location,
            ICollection<SchoolingEventDay> calendar,
            ICollection<SchoolingEventTicket> tickets)
        {
            Title = title;
            Description = description;
            Location = location;
            Calendar = calendar;
            Tickets = tickets;
        }
    }
}
