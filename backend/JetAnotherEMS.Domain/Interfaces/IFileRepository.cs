using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface IFileRepository : IRepository<UploadedFile>
    {
        Task SaveFile(UploadedFile file, Stream fileContent);

        Task MoveFile(UploadedFile file, string pathToMove);

        FileStream GetFileStream(UploadedFile file);

        Task RemoveFile(Guid id);
    }
}
