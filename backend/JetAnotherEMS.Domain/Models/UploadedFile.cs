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
        public static Dictionary<UploadedFileType, string>  MimeTypesByFileType = new Dictionary<UploadedFileType, string>()
        {
            { UploadedFileType.Jpg, "image/jpeg"},
            { UploadedFileType.Png, "image/png"},

            { UploadedFileType.Pdf, "application/pdf"},
            { UploadedFileType.Zip, "application/zip"},
        };

        public string FileName { get; set; }

        public string OriginalName { get; set; }

        [NotMapped] public string Type => MimeTypesByFileType[FileType];

        public UploadedFileType FileType { get; set; }

        public string LocationOnDisk { get; set; }

        /// <summary>
        /// Length in bytes
        /// </summary>
        public int Size { get; set; }

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
