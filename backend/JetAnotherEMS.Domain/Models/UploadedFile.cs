using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
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
            { UploadedFileType.Doc, "application/msword"},
            { UploadedFileType.Zip, "application/zip"},

            { UploadedFileType.Unknown, "UNKNOWN"}
        };

        /// <summary>
        /// Length in bytes
        /// </summary>
        public long Size { get; set; }

        public string FileName { get; set; }

        public string OriginalName { get; set; }

        public string LocationOnDisk { get; set; }

        public string FtpFileUrl { get; set; }

        [NotMapped]
        public string Type => MimeTypesByFileType[FileType];

        [NotMapped]
        public UploadedFileType FileType => MapExtension(OriginalName);

        [NotMapped] public string FullFilePath => !string.IsNullOrEmpty(LocationOnDisk) ? Path.Combine(LocationOnDisk, FileName) : null;

        public static UploadedFileType MapExtension(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return UploadedFileType.Unknown;

            var extension = Path.GetExtension(fileName)?.ToLower();

            switch (extension)
            {
                case ".jpg":
                    return UploadedFileType.Jpg;
                case ".png":
                    return UploadedFileType.Png;
                case ".pdf":
                    return UploadedFileType.Pdf;
                case ".doc":
                    return UploadedFileType.Doc;
                case ".zip":
                    return UploadedFileType.Zip;
                default:
                    return UploadedFileType.Unknown;
            }
        }
    }


    public enum UploadedFileType
    {
        Unknown,

        Jpg,
        Png,

        Pdf,
        Doc,
        Zip
    }
}
