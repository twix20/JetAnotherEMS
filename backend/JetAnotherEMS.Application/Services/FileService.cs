using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Services
{
    public class FileService : IFileService
    {

        private readonly IMediatorHandler _bus;
        private readonly IFileRepository _fileRepository;

        public FileService(
            IFileRepository fileRepository, 
            IMediatorHandler bus)
        {
            _fileRepository = fileRepository;
            _bus = bus;
        }

        public async Task<UploadedFileViewModel> GetById(Guid id)
        {
            var entity = await _fileRepository.GetById(id);

            return Mapper.Map<UploadedFileViewModel>(entity);
        }

        public async Task SaveFile(UploadedFileViewModel fileViewModel, Stream contentStream, string pathToSave)
        {
            //TODO: validate
            var entity = Mapper.Map<UploadedFile>(fileViewModel);

            var extension = Path.GetExtension(entity.FileName);
            entity.FileName = $"{fileViewModel.Id}{extension}";

            await _fileRepository.Add(entity);

            await _fileRepository.SaveFile(entity, contentStream);

            await _fileRepository.SaveChanges();
        }

        public async Task DeleteFile(Guid id)
        {
            await _fileRepository.RemoveFile(id);

            await _fileRepository.Remove(id);

            await _fileRepository.SaveChanges();
        }

        public async Task MoveFile(UploadedFileViewModel file, string pathToMove)
        {
            var entity = Mapper.Map<UploadedFile>(file);

            await _fileRepository.MoveFile(entity, pathToMove);
        }

        public FileStream GetFileStream(UploadedFile file)
        {
            throw new NotImplementedException();
        }

        public FileStream GetFileStream(UploadedFileViewModel file)
        {
            var entity = Mapper.Map<UploadedFile>(file);

            return _fileRepository.GetFileStream(entity);
        }
    }
}
