import React from 'react';
import ProptTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachmentIcon from '@material-ui/icons/Attachment';
import School from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import TagsList from '../TagsList';
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    display: 'inline',
    marginLeft: theme.spacing.unit
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  activityContainer: {
    paddingBottom: theme.spacing.unit,
    borderLeft: `4px solid ${theme.palette.grey['300']}`
  },
  timeline: {
    paddingLeft: theme.spacing.unit * 3,
    position: 'relative'
  },
  timelineAvatar: {
    position: 'absolute',
    left: -(theme.spacing.unit * 3),
    top: -theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.light,
    boxShadow: `0 0 15px 7px ${theme.palette.background.paper}`
  },
  tutor: {},
  attachmentItem: {
    marginRight: theme.spacing.unit
  },
  descriptionContainer: {
    padding: theme.spacing.unit
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    marginTop: theme.spacing.unit * 2
  },
  tag: {
    padding: theme.spacing.unit / 2,
    width: 'unset'
  }
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

//TODO: rename DaySchedule to DayActivity
class DaySchedule extends React.Component {
  state = {};

  render() {
    const { classes, day } = this.props;

    const secondary = true;

    return (
      <Grid container className={classes.activityContainer}>
        <Grid item xs={3} lg={1} className={classes.timeline}>
          <Avatar className={classes.timelineAvatar} color="secondary">
            <School />
          </Avatar>
          <Typography variant="title">
            {moment(day.start).format('HH:MM')}
          </Typography>
          <Typography align="justify">
            {moment.duration(moment(day.end).diff(day.start)).asHours()}h
          </Typography>
        </Grid>

        <Grid item lg={11}>
          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.heading}>
                      <b>{day.title}</b>
                    </Typography>
                    <Typography className={classes.heading} variant="caption">
                      with
                    </Typography>
                    <Typography
                      gutterBottom
                      className={classNames(classes.heading, classes.tutor)}
                    >
                      {day.teacher}
                    </Typography>
                    <Typography className={classes.heading} variant="caption">
                      at
                    </Typography>
                    <Typography className={classes.heading}>
                      {day.lectureRoom}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.attachmentItem}>
                    <AttachmentIcon />
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Grid container>
                  <Grid
                    item
                    container
                    direction="column"
                    justify="space-between"
                    xs={8}
                    className={classes.descriptionContainer}
                  >
                    <Grid item>
                      <Typography variant="title">Description</Typography>
                      <Typography variant="body1">{day.description}</Typography>
                    </Grid>
                    <Grid item>
                      <TagsList />
                    </Grid>
                  </Grid>
                  <Grid item className={classes.helper} lg={4}>
                    <Typography variant="subheading">Attachments</Typography>

                    <List dense={true}>
                      {generate(
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="info.pdf"
                            secondary={secondary ? '320kb' : null}
                          />
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Delete">
                              <CloudDownloadIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                  Save
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </div>
        </Grid>
      </Grid>
    );
  }
}

DaySchedule.propTypes = {
  day: ProptTypes.object.isRequired
};

export default withStyles(styles)(DaySchedule);
