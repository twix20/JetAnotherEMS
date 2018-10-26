import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EventDetailsTab from './EventDetailsTab';
import EventCalendar from './EventCalendar';
import GalleryUploaderTab from './GalleryUploaderTab';
import GenericTabs from './GenericTabs';
import { Field, FieldArray, reduxForm } from 'redux-form';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  }
});

class CreatorTabs extends React.Component {
  state = {};

  getTabs = () => {
    return [
      {
        label: 'Event details',
        content: () => <EventDetailsTab />
      },
      {
        label: 'Schedule',
        content: () => {
          const renderCalendar = props => {
            return <EventCalendar {...props} />;
          };

          return <FieldArray name="calendar" component={renderCalendar} />;
        }
      },
      {
        label: 'Gallery',
        content: () => <GalleryUploaderTab />
      }
    ];
  };

  handleCreateEvent = event => {
    console.log('handleCreateEvent');
    console.log(event);
  };

  render() {
    const { onTabChange } = this.props;

    return <GenericTabs onTabChange={onTabChange} tabs={this.getTabs()} />;
  }
}

CreatorTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  onTabChange: PropTypes.func
};

export default withStyles(styles)(CreatorTabs);
