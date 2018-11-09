import saveAs from 'file-saver';

import API from './api';

export const saveFileById = (fileId, fileName) => {
  API.file.download({ id: fileId }).then(response => {
    const blob = new Blob([response.data]);
    saveAs(blob, fileName);
  });
};

export const formatBytes = x => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let l = 0,
    n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l];
};
