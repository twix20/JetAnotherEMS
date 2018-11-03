import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import EventCreatorDialog from '../EventCreatorDialog';
import FabButton from '../common/FabButton';
import { createRandomGuid } from '../../services/randomService';
import schoolingEventActions from '../../actions/schoolingEventActions';
import { createLoadingSelector } from '../../reducers/selectors';

import moment from 'moment';

const styles = theme => {};

class EventCreatorOpenerButton extends React.Component {
  state = {
    eventCreatorOpen: false,
    initialValues: {
      calendar: [
        {
          id: createRandomGuid(),
          title: 'All Day Event very long title',
          description: 'Example descr',
          lectureRoom: 'Lecture room',
          teacher: 'teacher',
          // allDay: true,
          start: moment().toDate(),
          end: moment()
            .add(2, 'hours')
            .toDate()
        }
      ]
    }
  };

  handleFabClick = () => {
    const { eventId, loadInitialValues } = this.props;

    if (eventId) {
      loadInitialValues(eventId);
    }

    this.setState({
      eventCreatorOpen: true
    });
  };
  handleEventCreatorClose = () => {
    this.setState({
      eventCreatorOpen: false
    });
  };

  render() {
    const { eventCreatorOpen, initialValues } = this.state;
    const { mode, isLoadingForm } = this.props;

    return (
      <div>
        <EventCreatorDialog
          open={eventCreatorOpen}
          isLoadingForm={isLoadingForm}
          handleClose={this.handleEventCreatorClose}
          initialValues={initialValues}
        />
        <FabButton mode={mode} onClick={this.handleFabClick} />
      </div>
    );
  }
}

EventCreatorOpenerButton.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit']),
  eventId: PropTypes.string
};

const mapStateToProps = state => ({
  isLoadingForm: createLoadingSelector([
    schoolingEventActions.loadEventCreatorInitialValues.type
  ])(state)
});
const mapDispatchToProps = dispatch => ({
  loadInitialValues: eventId =>
    dispatch(
      schoolingEventActions.loadEventCreatorInitialValues.start({
        eventId
      })
    )
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventCreatorOpenerButton)
);
