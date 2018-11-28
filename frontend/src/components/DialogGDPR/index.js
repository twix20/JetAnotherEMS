import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class DialogGDPR extends React.Component {
  state = {
    open: true
  };

  componentDidMount() {
    const hasSeenGdpr = localStorage.getItem('cookies');

    this.setState({ open: !hasSeenGdpr });
  }

  handleClose = () => {
    localStorage.setItem('cookies', true);
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <Dialog onClose={this.handleClose} open={open}>
        <DialogTitle>Cookies</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The website uses cookies in order to offer relevant information and
            optimal performance. By continuing you agree upon this policy.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogGDPR;
