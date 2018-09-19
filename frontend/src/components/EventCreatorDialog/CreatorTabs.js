import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EventDetailsTab from './EventDetailsTab';
import EventCalendar from './EventCalendar';
import GalleryUploaderTab from './GalleryUploaderTab';
import GenericTabs from './GenericTabs';

const tabs = [
  {
    label: 'Event details',
    content: () => <EventDetailsTab />
  },
  {
    label: 'Schedule',
    content: () => <EventCalendar />
  },
  {
    label: 'Gallery',
    content: () => <GalleryUploaderTab />
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  }
});

class CreatorTabs extends React.Component {
  render() {
    const { onTabChange } = this.props;

    return <GenericTabs onTabChange={onTabChange} tabs={tabs} />;
  }
}

CreatorTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  onTabChange: PropTypes.func
};

export default withStyles(styles)(CreatorTabs);
