using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public abstract class SchoolingEventCommand : Command
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public SchoolingEventAddress Location { get; set; }

        public ICollection<SchoolingEventDay> Calendar { get; set; }

        public ICollection<SchoolingEventTicket> Tickets { get; set; }

        public ICollection<SchoolingEventGalleryFile> Gallery { get; set; }

        public SchoolingEventCommand(
            Guid id,
            string title,
            string description,
            bool isPublic,
            SchoolingEventAddress location,
            ICollection<SchoolingEventDay> calendar,
            ICollection<SchoolingEventTicket> tickets, 
            ICollection<SchoolingEventGalleryFile> gallery)
        {
            Id = id;
            Title = title;
            Description = description;
            IsPublic = isPublic;
            Location = location;
            Calendar = calendar;
            Tickets = tickets;
            Gallery = gallery;
        }
    }
}
