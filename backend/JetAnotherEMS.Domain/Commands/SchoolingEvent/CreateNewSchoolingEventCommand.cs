﻿using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class CreateNewSchoolingEventCommand : Command
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public GoogleMapsAddress Location { get; set; }

        //TODO: add more members
    }
}
