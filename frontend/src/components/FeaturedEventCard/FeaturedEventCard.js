import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AccessTime from '@material-ui/icons/AccessTime';
import CalendarToday from '@material-ui/icons/CalendarToday';
import TagsList from '../TagsList';
import { Link } from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import HeartCheckbox from '../common/HeartCheckbox';
import SchoolIcon from '@material-ui/icons/School';
import EventImagesCarousel from '../EventImagesCarousel';
import moment from 'moment';

import Can from '../Can';

const styles = theme => ({
  root: {
    width: '100%'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '300px',
    height: '100%'
  },
  imageContainer: {
    position: 'relative',

    '& .carousel .slide img': {
      height: 'auto',
      maxWidth: '100%',
      maxHeight: 200
    }
  },
  heart: {
    position: 'absolute',
    left: 0,
    zIndex: 3
  },
  detailsContainer: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  infoContainer: {
    justifyContent: 'space-evenly'
  },
  infoDetailSection: {
    flexGrow: 1,
    textAlign: 'center',
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    borderWidth: '0 2px 0 0',

    [theme.breakpoints.up('lg')]: {
      '&:not(:first-child)': {
        borderTopWidth: '2px'
      }
    },
    [theme.breakpoints.down('md')]: {
      borderBottomWidth: '2px',
      '&:not(:first-child)': {
        borderRightWidth: 0
      }
    }
  },
  infoDetail: {
    color: theme.palette.primary.main,
    '& h1': {
      display: 'inline'
    }
  },
  infoNumber: {
    marginRight: theme.spacing.unit
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: theme.typography.body1.lineHeight,
    maxHeight: theme.typography.body1.lineHeight * 3,
    '-webkit-line-clamp': 3 /* number of lines to show */,
    '-webkit-box-orient': 'vertical'
  },
  dateLeft: {
    position: 'absolute',
    right: 0,
    top: theme.spacing.unit * 2,
    borderRadius: 0
  },
  priceContaier: {
    textAlign: 'center',
    position: 'relative',
    padding: theme.spacing.unit,
    '&:before, &:after': {
      position: 'absolute',
      content: "' '",
      height: '24px',
      width: '24px',
      borderRadius: '50%',
      display: 'block',
      backgroundColor: theme.palette.background.default
    },

    '&:before': {
      top: '-12px',
      left: '-12px'
    },

    [theme.breakpoints.down('md')]: {
      borderTop: `2px dashed ${theme.palette.divider}`,

      '&:after': {
        top: '-12px',
        right: '-12px'
      }
    },

    [theme.breakpoints.up('lg')]: {
      borderLeft: `2px dashed ${theme.palette.divider}`,
      '&:after': {
        bottom: '-12px',
        left: '-12px'
      }
    }
  },
  priceButtonContainer: {
    marginTop: theme.spacing.unit * 2,

    '& a': {
      textDecoration: 'none'
    }
  },
  descriptionContainer: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex'
  }
});

class FeaturedEventCard extends React.PureComponent {
  render() {
    const { classes, event, onFollowClicked } = this.props;

    const teacherNames = event.teacherNames.join(', ');
    const galleryUrls = event.gallery.map(g => g.ftpFileUrl);

    return (
      <Paper className={classes.root}>
        <Grid container direction="row">
          <Grid item className={classes.imageContainer} md={3}>
            <Can I="follow" a="SchoolingEvent">
              <HeartCheckbox
                id={`favoriteEvent_${event.id}`}
                className={classes.heart}
                checked={!!event.isFollowing}
                onClick={onFollowClicked}
              />
            </Can>

            <EventImagesCarousel
              slides={galleryUrls}
              autoPlay
              // dynamicHeight
            />
          </Grid>
          <Grid
            item
            container
            direction="row"
            className={classes.infoContainer}
            lg={1}
          >
            <Grid
              item
              container
              direction="column"
              justify="center"
              className={classes.infoDetailSection}
              lg={12}
              xs={6}
            >
              <Grid item className={classes.infoDetail}>
                <Tooltip position="bottom" title={teacherNames}>
                  <div>
                    <Typography
                      className={classes.infoNumber}
                      variant="display1"
                      color="primary"
                    >
                      {event.teacherNames.length}
                    </Typography>
                    <SchoolIcon />
                  </div>
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>Teachers</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              className={classes.infoDetailSection}
              lg={12}
              xs={6}
            >
              <Grid item className={classes.infoDetail}>
                <Typography
                  className={classes.infoNumber}
                  variant="display1"
                  color="primary"
                >
                  {event.scheduleDaysCount}
                </Typography>

                <CalendarToday />
              </Grid>

              <Grid item>
                <Typography>Days</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={6}
            className={classes.detailsContainer}
          >
            <Tooltip
              title={moment(event.startingDateTime).fromNow()}
              placement="top"
            >
              <Chip
                avatar={<AccessTime />}
                label={moment(event.startingDateTime).format('DD/MM/YYYY')}
                className={classes.dateLeft}
              />
            </Tooltip>

            <Grid item>
              <Typography variant="title" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                <PlaceIcon fontSize="inherit" />
                {event.location.description}
              </Typography>
            </Grid>

            <Grid item className={classes.descriptionContainer}>
              <Typography variant="body1" className={classes.description}>
                {event.description}
              </Typography>
            </Grid>

            <Grid item>
              <TagsList tags={event.featuredTags} />
            </Grid>
          </Grid>
          <Grid
            item
            lg={2}
            className={classes.priceContaier}
            justify="center"
            direction="column"
            container
          >
            <Grid item>
              <Typography variant="caption">Tickets from</Typography>
              <Typography variant="display1">
                ${event.minTicketPrice}
              </Typography>
              <Typography>{event.ticketsLeftCount} tickets left</Typography>
            </Grid>

            <Grid item className={classes.priceButtonContainer}>
              <Link to={`event/${event.id}`}>
                <Button variant="contained" color="secondary">
                  More details
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

FeaturedEventCard.defaultProps = {
  onFollowClicked: e => {}
};

export default withStyles(styles)(FeaturedEventCard);
