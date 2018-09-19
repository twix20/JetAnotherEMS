import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GenericTabs from './GenericTabs';

const tabs = [
  {
    label: 'Tickets',
    content: () => <div>asdsda </div>
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
