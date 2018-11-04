import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { TicketStatus, enumPropFromValue } from '../../constants/enums';

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

const styles = theme => ({
  actionButton: {
    height: 'unset',
    width: 'unset',
    marginRight: theme.spacing.unit
  },
  iconButton: {
    marginRight: theme.spacing.unit * 2,
    top: '50%',
    position: 'relative',
    transform: 'translateY(-50%)'
  },
  approveButton: {
    color: green[800]
  },
  rejectButton: {
    color: red[800]
  },
  chip: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      height: 17
    }
  },
  approvedChip: {
    backgroundColor: green[800],
    color: theme.palette.common.white
  },
  rejectedChip: {
    backgroundColor: red[800],
    color: theme.palette.common.white
  }
});

const ParticipantsToolbarSelect = ({
  selectedRows,
  classes,
  onApproveClicked,
  onRejectClicked
}) => {
  return (
    <div>
      <Tooltip title={'Approve all'}>
        <IconButton
          className={classNames(classes.iconButton, classes.approveButton)}
          onClick={() => onApproveClicked(selectedRows)}
          //aria-label={textLabels.deleteAria}
        >
          <DoneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={'Reject all'}>
        <IconButton
          className={classNames(classes.iconButton, classes.rejectButton)}
          onClick={() => onRejectClicked(selectedRows)}
          //aria-label={textLabels.deleteAria}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

ParticipantsToolbarSelect.propTypes = {
  onApproveClicked: PropTypes.func.isRequired,
  onRejectClicked: PropTypes.func.isRequired
};

class PeopleTable extends React.Component {
  ticketStatusToDisplay(status, classes) {
    switch (status) {
      case 'Approved':
      case TicketStatus.Approved:
        return {
          label: 'Approved',
          chip: (
            <Chip
              label="Approved"
              className={classNames(classes.chip, classes.approvedChip)}
            />
          )
        };
      case 'Awaiting Approval':
      case TicketStatus.AwaitingApproval:
        return {
          label: 'Awaiting Approval',
          chip: <Chip label="Awaiting Approval" className={classes.chip} />
        };
      case 'Rejected':
      case TicketStatus.Rejected:
        return {
          label: 'Rejected',
          chip: (
            <Chip
              label="Rejected"
              className={classNames(classes.chip, classes.rejectedChip)}
            />
          )
        };
      default:
        throw `Invalid ticket status! ${status}`;
    }
  }

  render() {
    const { classes, people, onApproveClicked, onRejectClicked } = this.props;

    const peopleData = people.map(p => [
      p.userEmail,
      `${p.ticketName}`,
      `${p.ticketPrice}${p.ticketCurrency}`,
      this.ticketStatusToDisplay(p.status, classes).label
    ]);

    const options = {
      filterType: 'checkbox',
      responsive: 'stacked',
      selectableRows: true,
      customToolbarSelect: selectedRows => (
        <ParticipantsToolbarSelect
          classes={classes}
          selectedRows={selectedRows}
          participants={peopleData}
          onApproveClicked={onApproveClicked}
          onRejectClicked={onRejectClicked}
        />
      )
    };

    const columns = [
      {
        name: 'Email',
        options: {
          filter: false
        }
      },
      'Ticket',
      'Price',
      {
        name: 'Status',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return this.ticketStatusToDisplay(value, classes).chip;
          }
        }
      }
    ];

    return (
      <MUIDataTable
        title={'Participants'}
        data={peopleData}
        columns={columns}
        options={options}
      />
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.array.isRequired,
  onApproveClicked: PropTypes.func.isRequired,
  onRejectClicked: PropTypes.func.isRequired
};

export default withStyles(styles)(PeopleTable);
