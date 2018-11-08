using System.Collections.Generic;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.ViewModels
{
    public class UploadedFileViewModel : EntityViewModel
    {
        public string FileName { get; set; }

        public string OriginalName { get; set; }


        /// <summary>
        /// one of the MIME types
        /// </summary>
        public string Type { get; set; }

        public UploadedFileType FileType { get; set; }

        public string LocationOnDisk { get; set; }

        /// <summary>
        /// File Size in bytes
        /// </summary>
        public long Size { get; set; }
    }
}
