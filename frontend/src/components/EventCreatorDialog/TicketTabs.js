import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GenericTabs from './GenericTabs';
import TicketListCreator from './TicketListCreator';

const tabs = [
  {
    label: 'Tickets',
    content: () => <TicketListCreator />
  }
];

const styles = () => ({});

class TicketTabs extends React.Component {
  render() {
    return <GenericTabs tabs={tabs} />;
  }
}

TicketTabs.propTypes = {};

export default withStyles(styles)(TicketTabs);
