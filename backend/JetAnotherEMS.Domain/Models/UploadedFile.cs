﻿using System.Collections.Generic;
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
            { UploadedFileType.Zip, "application/zip"},
        };

        public string FileName { get; set; }

        public string OriginalName { get; set; }

        [NotMapped] public string Type => MimeTypesByFileType[FileType];

        [NotMapped] public UploadedFileType FileType => MapExtension(OriginalName);

        public string LocationOnDisk { get; set; }

        public string WebUrl { get; set; }

        /// <summary>
        /// Length in bytes
        /// </summary>
        public long Size { get; set; }

        [NotMapped] public string FullFilePath => Path.Combine(LocationOnDisk, FileName);

        public static UploadedFileType MapExtension(string fileName)
        {
            var extension = Path.GetExtension(fileName)?.ToLower();

            switch (extension)
            {
                case ".jpg":
                    return UploadedFileType.Jpg;
                case ".png":
                    return UploadedFileType.Png;
                case ".pdf":
                    return UploadedFileType.Pdf;
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
        Zip
    }
}