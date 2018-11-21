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
        private readonly ISchoolingEventFollowerRepository _schoolingEventFollowerRepository;

        public SchoolingEventCommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService, 
            ISchoolingEventRepository schoolingEventRepository, 
            ISchoolingEventFollowerRepository schoolingEventFollowerRepository) : base(uow, bus, notifications, validationService)
        {
            _schoolingEventRepository = schoolingEventRepository;
            _schoolingEventFollowerRepository = schoolingEventFollowerRepository;
        }

        public async Task<Unit> Handle(CreateNewSchoolingEventCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid(ValidationService))
            {
                NotifyValidationErrors(message);
                return Unit.Value;
            }

            var entity = Mapper.Map<SchoolingEvent>(message);

            await _schoolingEventRepository.CreateEntireEvent(entity);

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

            await _schoolingEventRepository.UpdateEntireEvent(entity);

            if (await Commit())
            {
                //TODO: rise event
            }

            return Unit.Value;
        }

        public async Task<Unit> Handle(ChangeFollowSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            //TODO: add validation

            var userIdThatWantsToChangeFollowStatus = request.UserId;

            var eventEntity = await _schoolingEventRepository.GetById(request.EventId);
            var follower = eventEntity.Followers.FirstOrDefault(f => f.UserId == userIdThatWantsToChangeFollowStatus);

            if (request.IsFollowing && follower == null)
            {
                await _schoolingEventFollowerRepository.Add(new SchoolingEventFollower()
                {
                    UserId = userIdThatWantsToChangeFollowStatus,
                    EventId = eventEntity.Id
                });
                if (await Commit())
                {
                    //TODO: rise event
                }
            }
            else if (!request.IsFollowing && follower != null)
            {
                await _schoolingEventFollowerRepository.Remove(follower.Id);
                if (await Commit())
                {
                    //TODO: rise event
                }
            }

            return Unit.Value;
        }
    }
}
