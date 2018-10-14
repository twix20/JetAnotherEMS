using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class Tag : Entity
    {
        public string Value { get; set; }

        public string Description { get; set; }
    }
}
