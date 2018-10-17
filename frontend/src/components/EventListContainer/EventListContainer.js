import React from 'react';

import EventCard from '../EventCard/EventCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { connect } from 'react-redux';
import schoolingEventActions from '../../actions/schoolingEventActions';
import { schoolingEventSelectors } from '../../reducers/selectors';

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

  componentDidMount() {
    this.props.getFeaturedSchoolingEventsRequest();
  }

  render() {
    const n = 25;

    const { featuredEvents } = this.props;

    console.log(featuredEvents);
    return (
      <List>
        {featuredEvents.map((e, i) => (
          <ListItem disableGutters key={i}>
            <EventCard event={e} />
          </ListItem>
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  featuredEvents: schoolingEventSelectors.featured(state)
});

const mapDispatchToProps = dispatch => ({
  getFeaturedSchoolingEventsRequest: () => {
    dispatch(
      schoolingEventActions.getFeaturedSchoolingEventsRequest.start({
        page: 0,
        pageSize: 10
      })
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListContainer);
