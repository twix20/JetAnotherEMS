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
  getCurrentFiles = () => this.props.fields.getAll() || [];

  handleRemove = file => {
    const currentFiles = this.getCurrentFiles();
    const newFileList = currentFiles.filter(f => f.serverId !== file.serverId);

    this.props.updateCurrentFiles(newFileList);
  };

  handleComplete = (error, file) => {
    console.log('Id like to create attachment ');
    console.log(file);
    console.log(file.ge);

    if (error) {
      console.log(error);
      return;
    }

    const x = this.pond.getFiles();
    if (x) {
      console.log(x);
    }

    if (this.props.fields) {
      const currentFiles = this.getCurrentFiles();
      const newFileList = [
        ...currentFiles,
        {
          lastModified: file.file.lastModified,
          lastModifiedDate: file.file.lastModifiedDate,
          name: file.file.name,
          size: file.file.size,
          type: file.file.type,
          status: file.status,
          serverId: file.serverId
        }
      ];

      this.props.updateCurrentFiles(newFileList);
    }
  };

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  componentDidMount() {
    console.log('Uploader mount');
  }

  render() {
    const { classes, onUpdateFiles, initialFiles } = this.props;

    const currentFiles = this.props.fields.getAll() || [];

    return (
      <div className={classes.root}>
        <FilePond
          ref={ref => (this.pond = ref)}
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
            this.handleComplete(error, file);
          }}
          onremovefile={file => {
            this.handleRemove(file);
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

            //TODO: TO PIERDOLIISAIDSAIDSA
            // this.props.dispatch(
            //   changleFieldValue(
            //     this.props.meta.form,
            //     this.props.fields.name,
            //     updatedItems
            //   )
            // );

            //onUpdateFiles(fileItems);
          }}
        >
          {currentFiles.map((file, i) => {
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCurrentFiles: newFileList =>
    dispatch(
      changleFieldValue(ownProps.meta.form, ownProps.fields.name, newFileList)
    )
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttachmentsUploader)
);
