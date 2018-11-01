using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface IFileService
    {
        Task<UploadedFileViewModel> GetById(Guid id);

        Task SaveFile(UploadedFileViewModel fileViewModel, Stream contentStream, string pathToSave);

        Task DeleteFile(Guid id);

        Task MoveFile(UploadedFileViewModel file, string pathToMove);

        FileStream GetFileStream(UploadedFile file);
    }
}
