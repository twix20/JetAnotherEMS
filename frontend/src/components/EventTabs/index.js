import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import DayScheduleCarousel from '../../components/DayScheduleCarousel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PlaceIcon from '@material-ui/icons/Place';
import MapIcon from '@material-ui/icons/Map';
import times from 'lodash/times';

import PeopleTable from '../../components/PeopleTable';
import ParticipantsTab from '../../components/ParticipantsTab';
import GoogleMapReact from 'google-map-react';

import { connect } from 'react-redux';
import { schoolingEventSelectors } from '../../reducers/selectors';

const cords = {
  lat: 51.1078852,
  lng: 17.0385376
};

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
    const { classes, eventId, getEvent } = this.props;
    const { value } = this.state;

    const event = getEvent(eventId);

    if (!event) return null;

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
            <Tab label="Participants" icon={<PersonPinIcon />} />
            <Tab label="Location" icon={<MapIcon />} />
          </Tabs>
        </AppBar>

        <div className={classes.tabContentContainer}>
          {value === 0 && <DayScheduleCarousel eventId={eventId} />}
          {value === 1 && (
            <TabContainer>
              <ParticipantsTab eventId={eventId} />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <LocationMap center={cords} zoom={11} markContent={markContent} />
            </TabContainer>
          )}
        </div>
      </div>
    );
  }
}

EventTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  eventId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  getEvent: id => schoolingEventSelectors.eventById(state, id)
});

export default withStyles(styles)(connect(mapStateToProps)(EventTabs));
