﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface IUser
    {
        Guid Id { get; }
        string Name { get; }
        bool IsAuthenticated();
        IEnumerable<Claim> GetClaimsIdentity();
    }
}
