import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';
import { Typography } from '@material-ui/core';

import 'react-fine-uploader/gallery/gallery.css';

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  galleryRoot: {
    '& .react-fine-uploader-gallery-file-input-container': {
      width: '200px'
    }
  },
  fileInputIcon: {
    marginRight: theme.spacing.unit
  }
});

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
      allowedExtensions: ['jpeg', 'jpg', 'png'],
      itemLimit: 3,
      sizeLimit: 5120000 // 50 kB = 50 * 1024 bytes
    },
    messages: {
      tooManyItemsError: 'Maximum image number to upload is 5'
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

class GalleryUploaderTab extends React.Component {
  fileInputChildren = () => (
    <span>
      <CloudUploadIcon className="react-fine-uploader-gallery-file-input-upload-icon" />
      Select Photos
    </span>
  );

  dropzoneContent = (
    <span className={'react-fine-uploader-gallery-dropzone-content'}>
      Drop up to 3 photos here!
    </span>
  );

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.galleryRoot}>
        <Gallery
          fileInput-children={this.fileInputChildren()}
          dropzone-content={this.dropzoneContent}
          uploader={uploader}
        />
      </div>
    );
  }
}

export default withStyles(styles)(GalleryUploaderTab);
