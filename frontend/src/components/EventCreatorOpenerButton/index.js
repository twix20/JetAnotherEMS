import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EventCreatorDialog from '../EventCreatorDialog';
import FabButton from '../common/FabButton';
import { createRandomGuid } from '../../services/randomService';

import moment from 'moment';

const styles = theme => {};

class EventCreatorOpenerButton extends React.Component {
  state = {
    eventCreatorOpen: true
  };

  handleFabClick = () => {
    this.setState({
      eventCreatorOpen: true
    });
  };
  handleEventCreatorClose = () => {
    this.setState({
      eventCreatorOpen: false
    });
  };

  handleSubmit = values => {
    console.log('Id like to create new event');
    console.log(values);
  };

  render() {
    const { eventCreatorOpen } = this.state;
    const { mode } = this.props;

    return (
      <div>
        <EventCreatorDialog
          open={eventCreatorOpen}
          handleClose={this.handleEventCreatorClose}
          onSubmit={this.handleSubmit}
          initialValues={{
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
          }}
        />

        <FabButton mode={mode} onClick={this.handleFabClick} />
      </div>
    );
  }
}

EventCreatorOpenerButton.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit'])
};

export default withStyles(styles)(EventCreatorOpenerButton);
