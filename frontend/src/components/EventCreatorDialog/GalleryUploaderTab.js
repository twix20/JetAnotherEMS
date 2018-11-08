import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { renderFileUploader } from '../forms';
import { FieldArray, Field } from 'redux-form';

import { change } from 'redux-form';
import { store } from './../../store';

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

class GalleryUploaderTab extends React.Component {
  render() {
    const { classes } = this.props;

    const renderGalleryUploader = props => {
      const initialFiles =
        props.input.value instanceof Array ? props.input.value : [];

      const onprocessfile = (error, file) => {
        if (file.serverId === null) return;

        let allFiles = initialFiles;
        let fileToUpdate = allFiles.find(x => x.id === file.id);
        fileToUpdate.serverId = file.serverId;

        store.dispatch(change(props.meta.form, props.input.name, allFiles));
      };

      return renderFileUploader({ ...props, initialFiles, onprocessfile });
    };

    return (
      <div className={classes.galleryRoot}>
        <Field
          name="gallery"
          component={renderGalleryUploader}
          allowMultiple={true}
          maxFiles={6}
        />
      </div>
    );
  }
}

export default withStyles(styles)(GalleryUploaderTab);
