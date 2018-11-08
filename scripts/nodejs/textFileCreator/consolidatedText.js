const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const getFileNamesArr = require('../helper').getFileNamesArr;

const writePath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'text_consolidated',
  'text_consolidated.txt'
);

var stream = fs.createWriteStream(writePath, { flags: 'a' });

// Create a list of json paths of the files which will be concatenated
let fileNamesArr = getFileNamesArr(
  path.join(__dirname, '..', '..', '..', 'text_lab_selected_files')
);

fileNamesArr.forEach((fileName, i) => {
  const readPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'text_lab_selected_files',
    fileName
  );

  let jsonObj = fs.readFileSync(readPath, 'utf8');

  stream.write(jsonObj + ' ');
});
