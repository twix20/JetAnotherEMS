import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { change as changleFieldValue } from 'redux-form';

import FineUploaderTraditional from 'fine-uploader-wrappers';

import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import merge from 'lodash/merge';

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
  state = {
    files: []
  };

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  componentDidMount() {
    const { initialFiles } = this.props;

    this.setState({ files: initialFiles || [] });
  }

  render() {
    const { classes, filePondRef } = this.props;

    return (
      <div className={classes.root}>
        <FilePond
          ref={ref => filePondRef(ref)}
          allowMultiple={true}
          maxFiles={3}
          server={{
            url: 'https://localhost:44364/api/File/',
            process: {
              url: 'Upload',
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }
          }}
          oninit={() => this.handleInit()}
          onprocessfile={(error, file) => {
            //this.handleComplete(error, file);
          }}
          onremovefile={file => {
            //this.handleRemove(file);
          }}
          onupdatefiles={fileItems => {
            //console.log(fileItems);

            const updatedItems = fileItems.map(fileItem => ({
              ...fileItem,
              lastModified: fileItem.file.lastModified,
              lastModifiedDate: fileItem.file.lastModifiedDate,
              name: fileItem.file.name,
              size: fileItem.file.size,
              type: fileItem.file.type,
              webkitRelativePath: fileItem.file.webkitRelativePath,
              status: fileItem.status,
              serverId: fileItem.serverId
            }));

            console.dir(updatedItems);

            this.setState({ files: updatedItems });

            //onUpdateFiles(fileItems);
          }}
        >
          {this.state.files.map((file, i) => {
            console.log('I want to render');
            console.log(file);

            return (
              <File
                key={i}
                src={file.serverId}
                name={file.name}
                size={file.size}
                type={file.type}
                //status={file.status}
                origin="local"
              />
            );
          })}
        </FilePond>
      </div>
    );
  }
}

AttachmentsUploader.defaultProps = {
  initialFiles: [],
  onUpdateFiles: files => true
};

AttachmentsUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  fineUploaderOptions: PropTypes.object
};

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttachmentsUploader)
);
