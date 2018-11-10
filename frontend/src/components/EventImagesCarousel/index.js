import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Carousel } from 'react-responsive-carousel';

class EventImagesCarousel extends React.Component {
  render() {
    const { slides, ...rest } = this.props;

    return (
      <Carousel emulateTouch infiniteLoop showThumbs={false} {...rest}>
        {slides.map((s, i) => (
          <div key={i}>
            <img src={s} />
          </div>
        ))}
      </Carousel>
    );
  }
}

EventImagesCarousel.propTypes = {
  slides: PropTypes.array.isRequired
};

export default EventImagesCarousel;
