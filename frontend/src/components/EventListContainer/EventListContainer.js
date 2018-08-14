import React from 'react';

import EventCard from '../EventCard/EventCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class EventListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          id: 2,
          title: 'Some fancy Title',
          description: 'Description',
          imageUrl:
            'https://workmax.pl/wp-content/uploads/2018/01/szkolenia-bhp.jpg'
        }
      ]
    };
  }

  render() {
    const n = 25;

    return (
      <List>
        {[...Array(n)].map((e, i) => (
          <ListItem>
            <EventCard
              event={this.state.events[i % this.state.events.length]}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default EventListContainer;
