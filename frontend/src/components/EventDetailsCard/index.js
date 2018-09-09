import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import EventImagesCarousel from '../EventImagesCarousel';

const styles = theme => ({});

class EventDetailsCard extends React.Component {
  render() {
    return (
      <Paper>
        <Grid container>
          <Grid item lg={5} md={12}>
            <EventImagesCarousel />
          </Grid>

          <Grid item lg={7} md={12}>
            Details
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(EventDetailsCard);
