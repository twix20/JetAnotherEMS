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

        /// <summary>
        /// Saves file to local disk
        /// </summary>
        /// <param name="fileViewModel"></param>
        /// <param name="contentStream"></param>
        /// <param name="pathToSave"></param>
        /// <param name="ftpFileUrl"></param>
        /// <returns></returns>
        Task SaveFile(UploadedFileViewModel fileViewModel, Stream contentStream, string pathToSave, string ftpFileUrl);

        /// <summary>
        /// Deletes file from local disk
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteFile(Guid id);

        Task MoveFile(UploadedFileViewModel file, string pathToMove);
    }
}
