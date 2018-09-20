import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const data = [
  ['Joe James', 'skippy@att.net', 'FREE - 0.00PLN', 'Paid', ''],
  ['John Walsh', 'bebing@aol.com', 'FREE - 0.00PLN', 'Paid', ''],
  ['Bob Herm', 'hyper@aol.com', 'VIP - 40.00PLN', 'Rejected', ''],
  ['James Houston', 'mosses@aol.com', 'VIP2 - 400.00PLN', 'NotPaid', ''],
  ['Joe James', 'skippy@att.net', 'FREE - 0.00PLN', 'Paid', ''],
  ['John Walsh', 'bebing@aol.com', 'FREE - 0.00PLN', 'Paid', ''],
  ['Bob Herm', 'hyper@aol.com', 'VIP - 40.00PLN', 'Rejected', ''],
  ['James Houston', 'mosses@aol.com', 'VIP2 - 400.00PLN', 'NotPaid', ''],
  ['Joe James', 'skippy@att.net', 'FREE - 0.00PLN', 'Paid', ''],
  ['John Walsh', 'bebing@aol.com', 'FREE - 0.00PLN', 'Paid', ''],
  ['Bob Herm', 'hyper@aol.com', 'VIP - 40.00PLN', 'Rejected', ''],
  ['James Houston', 'mosses@aol.com', 'VIP2 - 400.00PLN', 'NotPaid', ''],
  ['Joe James', 'skippy@att.net', 'FREE - 0.00PLN', 'Paid', ''],
  ['John Walsh', 'bebing@aol.com', 'FREE - 0.00PLN', 'Paid', ''],
  ['Bob Herm', 'hyper@aol.com', 'VIP - 40.00PLN', 'Rejected', ''],
  ['James Houston', 'mosses@aol.com', 'VIP2 - 400.00PLN', 'NotPaid', '']
];

const options = {
  filterType: 'checkbox',
  selectableRows: false
};

const styles = theme => ({
  actionButton: {
    height: 'unset',
    width: 'unset',
    marginRight: theme.spacing.unit
  }
});

class PeopleTable extends React.Component {
  render() {
    const { classes } = this.props;

    const columns = [
      'Name',
      'Email',
      'Ticket',
      'Status',
      {
        name: 'Actions',
        options: {
          customBodyRender: (value, tableMeta) => {
            return (
              <div>
                <IconButton
                  className={classes.actionButton}
                  aria-label="Accept"
                  style={{
                    color: green[800]
                  }}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton
                  className={classes.actionButton}
                  aria-label="Delete"
                  style={{
                    color: red[800]
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </div>
            );
          }
        }
      }
    ];

    return (
      <MUIDataTable
        title={'Participants'}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default withStyles(styles)(PeopleTable);
