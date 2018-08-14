import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
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
import SaveIcon from '@material-ui/icons/Save';
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
    backgroundColor: theme.palette.secondary.light
  },
  tutor: {},
  attachmentItem: {
    marginRight: theme.spacing.unit
  },
  attachmentBadge: {
    width: '20px',
    height: '20px',
    top: '-8px'
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

class DaySchedule extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    const secondary = true;

    return (
      <Grid container className={classes.activityContainer}>
        <Grid item lg={1} className={classes.timeline}>
          <Avatar className={classes.timelineAvatar} color="secondary">
            <School />
          </Avatar>
          <Typography variant="title">18:00</Typography>
          <Typography align="justify">{moment().format('l')}</Typography>
        </Grid>

        <Grid item lg={11}>
          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.heading}>
                      <b>English</b>
                    </Typography>
                    <Typography className={classes.heading} variant="caption">
                      with
                    </Typography>
                    <Typography
                      gutterBottom
                      className={classNames(classes.heading, classes.tutor)}
                    >
                      Piotr Markiewicz
                    </Typography>
                    <Typography className={classes.heading} variant="caption">
                      at
                    </Typography>
                    <Typography className={classes.heading}>C3 105</Typography>
                  </Grid>
                  <Grid item className={classes.attachmentItem}>
                    <Badge
                      badgeContent={3}
                      color="primary"
                      classes={{
                        badge: classes.attachmentBadge
                      }}
                    >
                      <AttachmentIcon />
                    </Badge>
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
                    lg={8}
                    className={classes.descriptionContainer}
                  >
                    <Grid item>
                      <Typography variant="headline">Description</Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, habeo dictas interesset et
                        est. Ne usu fabellas sensibus, ut ferri petentium eos.
                        Ut mei erant oporteat mandamus, utinam labores appareat
                        eu has, cibo causae ex nam. Ipsum errem in pri, ea sit
                        vero congue utinam, per aliquip tamquam an. Alii omnes
                        splendide has no, vim in nostrud postulant. Per errem
                        fabulas ne. Ei vel
                      </Typography>
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

export default withStyles(styles)(DaySchedule);
