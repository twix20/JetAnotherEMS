import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

const styles = theme => ({});

class GalleryUploaderTab extends React.Component {
  render() {
    return (
      <div>
        <ImagesUploader
          url="http://localhost:8080/multiple"
          optimisticPreviews
          onLoadEnd={err => {
            if (err) {
              console.error(err);
            }
          }}
          label="Upload multiple images"
        />
      </div>
    );
  }
}

export default withStyles(styles)(GalleryUploaderTab);
