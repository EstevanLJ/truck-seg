import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { LOCALE } from '../../../constants';

export default function FilesForm({ object, onChangeValue, errors }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: event => myCustomFileGetter(event)
  });

  const myCustomFileGetter = (event) => {
    const filesClone = [].concat(object.files);
    const files = [];
    const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (var i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      files.push(file);
      filesClone.push(file);
    }

    onChangeValue('files', filesClone);

    return files;
  }

  const handleRemoveFile = (index) => {
    const filesClone = [].concat(object.files);
    filesClone.splice(index, 1);
    onChangeValue('files', filesClone);
  }

  const files = object.files.map((file, index) => (
    <div key={`file_${index}`} className="py-4 border-b flex justify-between items-center">
      <div>
        <span className="far fa-file"></span> {file.name}
      </div>
      <IconButton
         onClick={() => handleRemoveFile(index)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>{LOCALE.drag_or_select}</p>
      </div>
      <div className="mt-4">
        <h4 className="font-weight-bold mb-3">{LOCALE.files}:</h4>
        <div>{files}</div>
      </div>
    </section>
  );
}
