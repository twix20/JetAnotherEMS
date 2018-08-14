import React from 'react';
import Header from '../../components/Header/Header';
import EventListContainer from '../../components/EventListContainer/EventListContainer';
import EventFilter from '../../components/EventFilter/EventFilter';
import Grid from '@material-ui/core/Grid';
import { Parallax, Background } from 'react-parallax';

class DefaultLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />

        {children}
      </div>
    );
  }
}

export default DefaultLayout;
