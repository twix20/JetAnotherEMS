import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import EventCreatorDialog from '../EventCreatorDialog';
import FabButton from '../common/FabButton';
import { createRandomGuid } from '../../services/randomService';
import schoolingEventActions from '../../actions/schoolingEventActions';
import {
  createLoadingSelector,
  schoolingEventSelectors
} from '../../reducers/selectors';

import moment from 'moment';

const styles = theme => {};

class EventCreatorOpenerButton extends React.Component {
  state = {
    initialValues: {
      calendar: []
    }
  };

  handleFabClick = () => {
    const { eventId, loadInitialValues, openDialog } = this.props;

    openDialog(true);

    if (eventId) {
      loadInitialValues(eventId);
    }
  };
  handleEventCreatorClose = () => {
    const { openDialog } = this.props;

    openDialog(false);
  };

  render() {
    const { initialValues } = this.state;
    const { mode, isLoadingForm, eventCreatorOpen } = this.props;

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
  ])(state),
  eventCreatorOpen: schoolingEventSelectors.isCreatorOpened(state)
});
const mapDispatchToProps = dispatch => ({
  loadInitialValues: eventId =>
    dispatch(
      schoolingEventActions.loadEventCreatorInitialValues.start({
        eventId
      })
    ),
  openDialog: isOpen =>
    dispatch(schoolingEventActions.openCreatorDialog(isOpen))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventCreatorOpenerButton)
);
