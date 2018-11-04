import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EventDetailsTab from './EventDetailsTab';
import EventCalendar from './EventCalendar';
import GalleryUploaderTab from './GalleryUploaderTab';
import GenericTabs from './GenericTabs';
import { FieldArray } from 'redux-form';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  }
});

class CreatorTabs extends React.Component {
  state = {
    tabs: []
  };

  componentDidMount() {
    this.setState({ tabs: this.getTabs() });
  }

  getTabs = () => {
    const { events } = this.props;
    return [
      {
        label: 'Event details',
        content: () => <EventDetailsTab />
      },
      {
        label: 'Schedule',
        content: () => {
          const renderCalendar = props => {
            return <EventCalendar events={events} {...props} />;
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

  render() {
    const { onTabChange } = this.props;
    const { tabs } = this.state;

    return <GenericTabs onTabChange={onTabChange} tabs={tabs} />;
  }
}

CreatorTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  onTabChange: PropTypes.func
};

export default withStyles(styles)(CreatorTabs);
