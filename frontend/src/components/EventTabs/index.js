import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import DayScheduleCarousel from '../../components/DayScheduleCarousel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MapIcon from '@material-ui/icons/Map';

import ParticipantsTab from '../../components/ParticipantsTab';
import GoogleMapReact from 'google-map-react';
import Can from '../../components/Can';
import { SchoolingEvent } from './../../models';
import ability from '../../config/ability';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  tabContentContainer: {
    padding: theme.spacing.unit * 1,
    minHeight: '45vh'
  }
});

function renderMarkers(map, maps, cords, content) {
  var infowindow = new google.maps.InfoWindow({
    content: content
  });

  let marker = new maps.Marker({
    position: cords,
    map,
    title: 'Wrocław'
  });

  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

const LocationMap = props => {
  return (
    <div style={{ height: '45vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAm_B9x-hZcSwq2rB97ZtU3NmKz_bQ6GZA' }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={({ map, maps }) =>
          renderMarkers(map, maps, props.center, props.markContent)
        }
      />
    </div>
  );
};

class EventTabs extends React.PureComponent {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, event } = this.props;
    const { value } = this.state;

    if (!event) return null;

    console.log(event);
    const eventModel = new SchoolingEvent({ ...event });

    const cords = { lat: event.location.lat, lng: event.location.lng };
    const markContent = event.location.description;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            centered
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Schedule" icon={<CalendarTodayIcon />} />
            <Tab label="Location" icon={<MapIcon />} />

            {ability.can('readParticipiants', eventModel) && (
              <Tab label="Participants" icon={<PersonPinIcon />} />
            )}
          </Tabs>
        </AppBar>

        <div className={classes.tabContentContainer}>
          {value === 0 && <DayScheduleCarousel eventId={event.id} />}
          {value === 1 && (
            <TabContainer>
              <LocationMap center={cords} zoom={11} markContent={markContent} />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <ParticipantsTab eventId={event.id} />
            </TabContainer>
          )}
        </div>
      </div>
    );
  }
}

EventTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

export default withStyles(styles)(EventTabs);
