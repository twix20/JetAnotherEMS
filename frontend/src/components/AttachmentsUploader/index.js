import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';

const uploader = new FineUploaderTraditional({
  // UI customizations
  options: {
    autoUpload: false,
    debug: true,

    chunking: {
      enabled: true
    },
    deleteFile: {
      enabled: true,
      endpoint: '/uploads'
    },
    request: {
      endpoint: '/uploads'
    },
    retry: {
      enableAuto: false
    },
    validation: {
      allowedExtensions: ['jpeg', 'jpg', 'png', 'pdf', 'zip'],
      itemLimit: 3,
      sizeLimit: 5120000 // 50 kB = 50 * 1024 bytes
    },
    messages: {
      tooManyItemsError: 'Maximum attachments quantity is 3'
    },
    callbacks: {
      onValidate: function(a, b) {
        console.log(a);
        console.log(b);
      },
      onError: function(id, name, errorReason, xhrOrXdr) {
        alert(`Error on file number ${id} - ${name}.  Reason: ${errorReason}`);
      }
    }
  }
});

const styles = theme => ({
  root: {
    width: '100%',

    //TODO: move it .scss file with BEM --compact
    '& .react-fine-uploader-gallery-dropzone': {
      minHeight: 50
    },
    '& .react-fine-uploader-gallery-file-input-container': {
      width: 140
    },
    '& .react-fine-uploader-gallery-dropzone-content': {
      width: 'unset',
      left: 'unset',
      top: '20%',
      right: '10%'
    }
  }
});

class AttachmentsUploader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Gallery uploader={uploader} />
      </div>
    );
  }
}

AttachmentsUploader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AttachmentsUploader);
