import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AccessTime from '@material-ui/icons/AccessTime';
import Person from '@material-ui/icons/Person';
import CalendarToday from '@material-ui/icons/CalendarToday';
import TagsList from '../TagsList';
import { Link } from 'react-router-dom';

const styles = theme => ({
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '300px',
    height: '100%'
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
    borderColor: theme.palette.grey['300'],
    borderStyle: 'solid',
    borderWidth: '0 2px 0 0',

    '&:not(:first-child)': {
      borderTopWidth: '2px'
    }
  },
  infoDetail: {
    color: theme.palette.primary.main,
    '& h1': {
      display: 'inline'
    }
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
    borderLeft: `2px dashed ${theme.palette.grey['300']}`
  },
  priceButtonContainer: {
    marginTop: theme.spacing.unit * 2
  }
});

class EventCard extends React.PureComponent {
  state = {};

  render() {
    const { classes, event } = this.props;

    return (
      <Paper>
        <Grid container direction="row">
          <Grid item>
            <img src={event.imageUrl} className={classes.image} />
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={1}
            className={classes.infoContainer}
          >
            <Grid
              item
              container
              direction="column"
              justify="center"
              className={classes.infoDetailSection}
            >
              <Grid item className={classes.infoDetail}>
                <Typography variant="display1" color="primary">
                  4
                </Typography>

                <Person />
              </Grid>
              <Grid item>
                <Typography>People</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              className={classes.infoDetailSection}
            >
              <Grid item className={classes.infoDetail}>
                <Typography variant="display1" color="primary">
                  55
                </Typography>

                <CalendarToday />
              </Grid>

              <Grid item>
                <Typography>Duration</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} className={classes.detailsContainer}>
            <Tooltip title="20/03/2018 Wtorek " placement="top">
              <Chip
                avatar={<AccessTime />}
                label="In 2 days"
                className={classes.dateLeft}
              />
            </Tooltip>

            <Typography variant="title">Jak wytresowac smoka?</Typography>
            <Typography variant="subheading" color="textSecondary" gutterBottom>
              Wrocław, Reja 23/20
            </Typography>

            <Typography variant="body1" className={classes.description}>
              Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
              przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
              przez nieznanego drukarzaw przemyśle poligraficznym. Został po w
              przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
              przez nieznanego drukarzaw przemyśle poligraficznym. Został po w
              przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
              przez nieznanego drukarzaw przemyśle poligraficznym. Został po
            </Typography>

            <TagsList />
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
              <Typography variant="display1">$12,300</Typography>
              <Typography>21 tickets left</Typography>
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

export default withStyles(styles)(EventCard);