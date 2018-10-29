using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Text;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class UploadedFile : Entity
    {
        public string FileName { get; set; }

        public string OriginalName { get; set; }

        public UploadedFileType Type { get; set; }

        public string LocationOnDisk { get; set; }

        /// <summary>
        /// Length in bytes
        /// </summary>
        public int Length { get; set; }

        [NotMapped] public string FullFilePath => Path.Combine(LocationOnDisk, FileName);
    }


    public enum UploadedFileType
    {
        Unknown,

        Jpg,
        Png,

        Pdf,
        Zip
    }
}
