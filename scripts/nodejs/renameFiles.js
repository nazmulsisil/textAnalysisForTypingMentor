var fs = require('fs');
const path = require('path');
const getFileNamesArr = require('./helper').getFileNamesArr;

function rename(folderPath, currFileName, newFileName) {
  const current = path.join(folderPath, currFileName);
  const newOne = path.join(folderPath, newFileName);
  fs.rename(current, newOne, function(err) {
    if (err) console.log('ERROR: ' + err);
  });
}

const folderPath = path.join(__dirname, '..', '..', 'text_lab_selected_files');
let fileNamesArr = getFileNamesArr(folderPath);

fileNamesArr.forEach(currFileName => {
  const newFileName = currFileName.replace(/ /g, '_');
  rename(folderPath, currFileName, newFileName);
});
