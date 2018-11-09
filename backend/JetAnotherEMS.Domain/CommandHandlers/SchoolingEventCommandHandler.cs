using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Events;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Domain.Validation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Domain.CommandHandlers
{
    public class SchoolingEventCommandHandler : CommandHandler,
        IRequestHandler<CreateNewSchoolingEventCommand>,
        IRequestHandler<UpdateSchoolingEventCommand>,
        IRequestHandler<ChangeFollowSchoolingEventCommand>
    {
        private readonly ISchoolingEventRepository _schoolingEventRepository;
        private readonly ISchoolingEventDayRepository _schoolingEventDayRepository;
        private readonly IFileRepository _fileRepository;

        public SchoolingEventCommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService, 
            ISchoolingEventRepository schoolingEventRepository,
            ISchoolingEventDayRepository schoolingEventDayRepository,
            IFileRepository fileRepository) : base(uow, bus, notifications, validationService)
        {
            _schoolingEventRepository = schoolingEventRepository;
            _schoolingEventDayRepository = schoolingEventDayRepository;
            _fileRepository = fileRepository;
        }

        public async Task<Unit> Handle(CreateNewSchoolingEventCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid(ValidationService))
            {
                NotifyValidationErrors(message);
                return Unit.Value;
            }

            var entity = Mapper.Map<SchoolingEvent>(message);

            await _schoolingEventRepository.Add(entity);

            if (await Commit())
            {
                await Bus.RaiseEvent(new SchoolingEventCreatedEvent(entity.Id));
            }

            return Unit.Value;
        }
        public async Task<Unit> Handle(UpdateSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            //TODO: add validation
            var entity = Mapper.Map<SchoolingEvent>(request);

            //var dbEntity = await _schoolingEventRepository.GetById(entity.Id);






            _schoolingEventRepository.Update(entity);

            if (await Commit())
            {
                //TODO: rise event
            }

            return Unit.Value;
        }

        public Task<Unit> Handle(ChangeFollowSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
