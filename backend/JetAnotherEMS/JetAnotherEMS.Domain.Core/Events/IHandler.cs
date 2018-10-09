﻿using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Domain.Core.Events
{
    public interface IHandler<in T> where T : Message
    {
        void Handle(T message);
    }
}
