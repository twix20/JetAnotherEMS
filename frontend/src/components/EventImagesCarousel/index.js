import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Carousel } from 'react-responsive-carousel';

class EventImagesCarousel extends React.Component {
  state = {
    slides: [
      {
        img:
          'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      },
      {
        img:
          'https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      },
      {
        img:
          'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      },
      {
        img:
          'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      },
      {
        img:
          'https://images.pexels.com/photos/2143/lights-party-dancing-music.jpg?auto=compress&cs=tinysrgb&h=750&w=1260'
      }
    ]
  };

  render() {
    const { slides } = this.state;

    return (
      <Carousel emulateTouch infiniteLoop showThumbs={false}>
        {slides.map((s, i) => (
          <div key={i}>
            <img src={s.img} />
          </div>
        ))}
      </Carousel>
    );
  }
}

export default EventImagesCarousel;
