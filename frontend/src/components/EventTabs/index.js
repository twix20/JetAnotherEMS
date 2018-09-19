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

import GoogleMapReact from 'google-map-react';

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

function renderMarkers(map, maps) {
  let marker = new maps.Marker({
    position: cords,
    map,
    title: 'Wrocław'
  });
}

const LocationMap = props => {
  return (
    <div style={{ height: '45vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC0g5z6TrUV9gh7xDT2PwK6HqRsf1PZu7s' }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      />
    </div>
  );
};

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Schedule" icon={<CalendarTodayIcon />} />
            <Tab label="People" icon={<PersonPinIcon />} />
            <Tab label="Location" icon={<MapIcon />} />
            <Tab label="Item Three" icon={<FavoriteIcon />} />
            <Tab label="Item Five" icon={<ShoppingBasket />} />
          </Tabs>
        </AppBar>

        <div className={classes.tabContentContainer}>
          {value === 0 && <DayScheduleCarousel />}
          {value === 1 && <TabContainer>People grid with tickets</TabContainer>}
          {value === 2 && (
            <TabContainer>
              <LocationMap center={cords} zoom={11} />
            </TabContainer>
          )}
          {value === 3 && <TabContainer>Item Four</TabContainer>}
          {value === 4 && <TabContainer>Item Five</TabContainer>}
        </div>
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollableTabsButtonForce);
