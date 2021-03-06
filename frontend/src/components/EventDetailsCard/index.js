import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import NoteIcon from '@material-ui/icons/Note';

import SchoolIcon from '@material-ui/icons/School';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Fade from '@material-ui/core/Fade';

import Divider from '@material-ui/core/Divider';

import EventImagesCarousel from '../EventImagesCarousel';
import CountdownTimer from '../common/CountdownTimer';

import EventTicketsOpenerButton from '../EventTicketsChooserDialog/EventTicketsOpenerButton';

import { connect } from 'react-redux';
import schoolingEventActions from '../../actions/schoolingEventActions';
import ticketActions from '../../actions/ticketActions';

import HeartCheckbox from '../common/HeartCheckbox';

import Can from '../Can';

import moment from 'moment';

import {
  userTicketsSelectors,
  schoolingEventSelectors
} from '../../reducers/selectors';

import API from '../../services/api';

const styles = theme => ({
  detailsContainer: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  details: {
    flex: 1
  },
  followCheckbox: {
    padding: 0
  },
  buyTicketContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2
  },
  carousel: {
    '& .carousel .slide img': {
      height: 'auto',
      maxWidth: '100%',
      maxHeight: 550
    }
  },
  expandedCarouselContainer: {
    margin: theme.spacing.unit * 3,

    justifyContent: 'center',
    display: 'flex',
    '& > div': {
      maxWidth: '80%'
    }
  }
});

const DetailsListItem = props => {
  const { icon, primaryText, secondaryText } = props;

  return (
    <ListItem>
      <ListItemAvatar>{icon()}</ListItemAvatar>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </ListItem>
  );
};

class EventDetailsCard extends React.Component {
  state = {
    headerMenuEl: null,
    expanded: false,
    detailsItems: [
      {
        icon: () => <LocationOnIcon />,
        primaryText: 'Location',
        secondaryText: 'Wrocław, Reja 23/20'
      },
      {
        icon: () => <DateRangeIcon />,
        primaryText: 'Date',
        secondaryText: '12.08.2018 - 13.04.2019'
      },
      {
        icon: () => <SchoolIcon />,
        primaryText: 'Teachers',
        secondaryText: '56'
      },
      {
        icon: () => <NoteIcon />,
        primaryText: 'Tickets left',
        secondaryText: '56'
      },
      {
        icon: () => <PersonIcon />,
        primaryText: 'People',
        secondaryText: '56'
      },
      {
        icon: () => <PersonIcon />,
        primaryText: 'People',
        secondaryText: '56'
      }
    ]
  };

  componentDidMount() {
    const { eventId, fetchUsersTicket, fetchAvailableTickets } = this.props;

    fetchUsersTicket(eventId);
    fetchAvailableTickets(eventId);
  }

  handleHeaderMenuClick = event => {
    this.setState({ headerMenuEl: event.currentTarget });
  };

  handleHeaderMenuClose = () => {
    this.setState({ headerMenuEl: null });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleTicketCancel = userEventTicketId => {
    const { cancelTicket, eventId } = this.props;
    cancelTicket(userEventTicketId, eventId);
  };

  handleFollowClick = newFollowStatus => {
    const { changeFollow, eventId } = this.props;

    changeFollow(eventId, newFollowStatus);
  };

  handleDownloadCallendar = () => {
    const { eventId } = this.props;

    window.location = API.schoolingEvent.downloadCalendarUrl({
      id: eventId
    });
  };

  handleDownloadAllAttachments = () => {
    const { eventId } = this.props;

    window.location = API.schoolingEvent.downloadAllAttachmentsUrl({
      id: eventId
    });
  };

  render() {
    const { classes, eventId } = this.props;
    const { headerMenuEl, expanded } = this.state;

    const ExpandIcon = expanded ? ExpandLessIcon : ExpandMoreIcon;

    const event = this.props.getEvent(eventId);
    const usersTicket = this.props.getUsersTicketForEvent(eventId);
    const availableTickets = this.props.getEventAvailableTickets(eventId);

    if (!event) return <div>Loading...</div>;

    const date = `${moment(event.startingDateTime).format('L')} -
      ${moment(event.endingDateTime).format('L')}`;
    const hasEventStarted = moment(event.startingDateTime).isBefore(new Date());

    const galleryUrls = event.gallery.map(g => g.ftpFileUrl);

    return (
      <div>
        {expanded && (
          <Fade in={expanded}>
            <div className={classes.expandedCarouselContainer}>
              <EventImagesCarousel slides={galleryUrls} autoPlay />
            </div>
          </Fade>
        )}

        <Card>
          <Grid container>
            <Grid
              item
              container
              lg={expanded ? 12 : 6}
              md={12}
              justify="center"
            >
              {!expanded && (
                <Fade in={!expanded}>
                  <div className={classes.carousel}>
                    <EventImagesCarousel slides={galleryUrls} autoPlay />
                  </div>
                </Fade>
              )}
            </Grid>

            <Grid
              item
              lg={expanded ? 12 : 6}
              md={12}
              container
              direction="column"
            >
              <Grid item>
                <CardHeader
                  action={
                    <div>
                      <IconButton onClick={this.handleHeaderMenuClick}>
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        id="simple-menu"
                        anchorEl={headerMenuEl}
                        open={Boolean(headerMenuEl)}
                        onClose={this.handleHeaderMenuClose}
                        anchorPosition=""
                      >
                        <MenuItem onClick={this.handleHeaderMenuClose}>
                          <ListItemIcon>
                            <ArrowUpwardIcon />
                          </ListItemIcon>
                          <ListItemText
                            inset
                            primary="Export scheadule"
                            onClick={this.handleDownloadCallendar}
                          />
                        </MenuItem>
                        <MenuItem onClick={this.handleHeaderMenuClose}>
                          <ListItemIcon>
                            <CloudDownloadIcon />
                          </ListItemIcon>
                          <ListItemText
                            inset
                            primary="Download all attachments"
                            onClick={this.handleDownloadAllAttachments}
                          />
                        </MenuItem>
                      </Menu>
                    </div>
                  }
                  title={event.title}
                />
              </Grid>

              <Grid item className={classes.details}>
                <CardContent className={classes.detailsContainer}>
                  <Grid container>
                    <Grid item lg={6}>
                      <List>
                        <DetailsListItem
                          icon={() => <LocationOnIcon />}
                          primaryText="Location"
                          secondaryText={event.location.description}
                        />
                        <DetailsListItem
                          icon={() => <DateRangeIcon />}
                          primaryText="Date"
                          secondaryText={date}
                        />
                      </List>
                    </Grid>
                    <Grid item lg={6}>
                      <List>
                        <DetailsListItem
                          icon={() => <SchoolIcon />}
                          primaryText="Teachers"
                          secondaryText={event.teacherNames.length}
                        />
                        <DetailsListItem
                          icon={() => <NoteIcon />}
                          primaryText="Tickets left"
                          secondaryText={event.ticketsLeftCount}
                        />
                      </List>
                    </Grid>
                    <Grid item md={12} container justify="center">
                      {hasEventStarted ? (
                        <div>ONGOING</div>
                      ) : (
                        <CountdownTimer startDate={event.startingDateTime} />
                      )}
                    </Grid>
                  </Grid>

                  <Collapse
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Divider />
                    <CardContent>
                      <Typography paragraph variant="headline">
                        Description
                      </Typography>
                      <Typography paragraph>{event.description}</Typography>
                    </CardContent>
                  </Collapse>
                </CardContent>
              </Grid>

              <Grid item container className={classes.buyTicketContainer}>
                <EventTicketsOpenerButton
                  eventId={eventId}
                  usersTicket={usersTicket}
                  availableTickets={availableTickets}
                  handleTicketCancel={this.handleTicketCancel}
                />
              </Grid>

              <Grid item>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Can I="follow" a="SchoolingEvent">
                    <IconButton
                      aria-label="Add to favorites"
                      onClick={() => this.handleFollowClick(!event.isFollowing)}
                    >
                      <HeartCheckbox
                        checked={!!event.isFollowing}
                        checkboxClassName={classes.followCheckbox}
                      />
                    </IconButton>
                  </Can>

                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandIcon />
                  </IconButton>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

EventDetailsCard.propTypes = {
  eventId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  getEvent: eventId => schoolingEventSelectors.eventById(state, eventId),
  getUsersTicketForEvent: eventId =>
    userTicketsSelectors.forEvent(state, eventId),
  getEventAvailableTickets: eventId =>
    schoolingEventSelectors.availableTickets(state, eventId)
});

//TODO: add more actions and dispatch requests only in sagas
const mapDispatchToProps = dispatch => ({
  fetchEvent: id =>
    dispatch(schoolingEventActions.getEventRequest.start({ id })),
  fetchUsersTicket: eventId =>
    dispatch(ticketActions.getTicketForEventRequest.start({ eventId })),
  fetchAvailableTickets: id =>
    dispatch(
      schoolingEventActions.getEventAvailableTicketsRequest.start({ id })
    ),
  cancelTicket: (id, eventId) =>
    dispatch(ticketActions.cancelTicketForEventRequest.start({ id, eventId })),
  changeFollow: (eventId, newFollowStatus) => {
    dispatch(
      schoolingEventActions.changeSchoolingEventFollow.start({
        eventId,
        newFollowStatus
      })
    );
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventDetailsCard)
);
