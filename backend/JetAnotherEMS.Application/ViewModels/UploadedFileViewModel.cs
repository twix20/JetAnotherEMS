using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.ViewModels
{
    public class UploadedFileViewModel : EntityViewModel
    {
        public string FileName { get; set; }

        public string OriginalName { get; set; }

        public UploadedFileType Type { get; set; }

        public string LocationOnDisk { get; set; }

        /// <summary>
        /// File length in bytes
        /// </summary>
        public long Length { get; set; }
    }
}
