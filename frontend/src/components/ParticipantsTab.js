import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import schoolingEventActions from '../actions/schoolingEventActions';
import { schoolingEventSelectors } from '../reducers/selectors';
import PeopleTable from './PeopleTable';

import { GET_EVENT_PARTICIPANTS_REQUEST } from '../constants/actionTypes';
import { createLoadingSelector } from './../reducers/selectors';
import ticketActions from '../actions/ticketActions';
import { TicketStatus } from '../constants/enums';

class ParticipantsTab extends React.Component {
  handleApprove = selectedRows => {
    const { eventId, approveTickets } = this.props;

    const userTicketIds = this.getSelectedParticipantsToDecide(selectedRows);

    approveTickets(eventId, userTicketIds);
  };
  handleReject = selectedRows => {
    const { eventId, rejectTickets } = this.props;

    const userTicketIds = this.getSelectedParticipantsToDecide(selectedRows);

    rejectTickets(eventId, userTicketIds);
  };

  getSelectedParticipantsToDecide = selectedRows => {
    const { eventId, eventParticipants } = this.props;

    const participants = eventParticipants(eventId);

    let selectedParticipantUserTicketIds = [];
    for (const r of selectedRows.data) {
      const p = participants[r.dataIndex];
      if (p.status === TicketStatus.AwaitingApproval) {
        selectedParticipantUserTicketIds.push(p.userSchoolingEventTicketId);
      }
    }

    return selectedParticipantUserTicketIds;
  };

  componentDidMount() {
    const { eventId, fetchParticipants } = this.props;

    fetchParticipants(eventId);
  }

  render() {
    const { eventId, eventParticipants, isLoadingParticipants } = this.props;
    const participants = eventParticipants(eventId);

    if (isLoadingParticipants(eventId)) return <div>Loading...</div>;

    return (
      <PeopleTable
        people={participants}
        onApproveClicked={this.handleApprove}
        onRejectClicked={this.handleReject}
      />
    );
  }
}

const mapStateToProps = state => ({
  eventParticipants: eventId =>
    schoolingEventSelectors.participants(state, eventId),
  isLoadingParticipants: eventId =>
    createLoadingSelector([
      { type: GET_EVENT_PARTICIPANTS_REQUEST, predicate: p => p.id === eventId }
    ])(state)
});

const mapDispatchToProps = dispatch => ({
  fetchParticipants: eventId =>
    dispatch(
      schoolingEventActions.getEventParticipantsRequest.start({ eventId })
    ),
  approveTickets: (eventId, userTicketIds) =>
    dispatch(
      ticketActions.changeTicketsSatusForEventRequest.start({
        eventId,
        userTicketIds,
        newTicketStatus: TicketStatus.Approved
      })
    ),
  rejectTickets: (eventId, userTicketIds) =>
    dispatch(
      ticketActions.changeTicketsSatusForEventRequest.start({
        eventId,
        userTicketIds,
        newTicketStatus: TicketStatus.Rejected
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantsTab);

ParticipantsTab.propTypes = {
  eventId: PropTypes.string.isRequired
};
