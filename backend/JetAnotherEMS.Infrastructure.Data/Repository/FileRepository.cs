using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class FileRepository : EntityFrameworkRepository<UploadedFile>, IFileRepository
    {
        public FileRepository(JetAnotherEmsContext context) : base(context)
        {
        }

        public async Task SaveFile(UploadedFile file, Stream fileContent)
        {
            var pathToSave = file.FullFilePath;

            if (!Directory.Exists(file.LocationOnDisk))
            {
                Directory.CreateDirectory(file.LocationOnDisk);
            }

            using (var fileStream = new FileStream(pathToSave, FileMode.Create))
            {
                await fileContent.CopyToAsync(fileStream);
            }
        }

        public Task MoveFile(UploadedFile file, string pathToMove)
        {
            throw new NotImplementedException();
        }

        public FileStream GetFileStream(UploadedFile file)
        {
            throw new NotImplementedException();
        }
    }
}
