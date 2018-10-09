using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        bool Commit();
    }
}
