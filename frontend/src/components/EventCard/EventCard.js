import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import AccessTime from '@material-ui/icons/AccessTime';
import Person from '@material-ui/icons/Person';
import CalendarToday from '@material-ui/icons/CalendarToday';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import classnames from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

import './EventCard.scss';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  },
  content: {
    flex: '1 0 auto'
  },
  wrapper: {
    position: 'relative',
    top: '25%'
  },
  detailsTypo: {
    color: theme.palette.primary.light
  },
  detailsItemInfo: {
    display: 'flex',
    justifyContent: 'space-evenly',
    color: theme.palette.primary.main
  },
  imageSlides: {
    position: 'relative',
    display: 'inline-block',
    margin: '0 auto'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%'
  }
});

class EventCard extends React.PureComponent {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, theme, event } = this.props;

    return (
      <Card className="eventCard">
        <Grid container>
          <Grid item xs={3} className={classes.imageSlides}>
            <img src={event.imageUrl} className={classes.image} />
          </Grid>

          <Grid item xs={1} className="eventcard__details">
            <div className="eventCard__details__item">
              <div className={classes.detailsItemInfo}>
                <Typography variant="title" color="inherit">
                  31
                </Typography>
                <Person />
              </div>
              <div className="eventCard__details__text">People</div>
            </div>
            <div className="eventCard__details__item">
              <div className={classes.detailsItemInfo}>
                <Typography variant="title" color="inherit">
                  10
                </Typography>
                <CalendarToday />
              </div>
              <div className="eventCard__details__text">Days</div>
            </div>
          </Grid>

          <Grid item xs={6} className="eventCard__content">
            <Tooltip title="20/03/2018 Wtorek " placement="top">
              <Chip
                avatar={<AccessTime />}
                label="In 2 days"
                className={`${classes.chip} eventCard__timeChip`}
              />
            </Tooltip>

            <Typography variant="title">Jak wytresowac smoka?</Typography>
            <Typography variant="subheading" color="textSecondary" gutterBottom>
              Wrocław, Reja 23/20
            </Typography>
            <div className="eventCard__content__description">
              <Typography variant="body1" color="textSecondary">
                Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz
                w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
                przez nieznanego drukarzaw przemyśle poligraficznym. Został po w
                przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
                przez nieznanego drukarzaw przemyśle poligraficznym. Został po w
                przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
                przez nieznanego drukarzaw przemyśle poligraficznym. Został po
              </Typography>
            </div>

            <div className="eventCard__content__tags">
              <Chip label="C#" />
              <Chip label="Docker" />
              <Chip label="Angular" />
              <Chip label="Linux" />
              <Chip label="Windows" />
            </div>
          </Grid>

          <Grid item xs={2} className="eventCard__tickets">
            <div className={classes.wrapper}>
              <div className="eventCard__tickets__price">$12,300</div>
              <div className="eventCard__tickets__per">21 tickets left</div>

              <Button
                variant="contained"
                color="secondary"
                className="eventCard__tickets__button"
              >
                More details
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EventCard);
