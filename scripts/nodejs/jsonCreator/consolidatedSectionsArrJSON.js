const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const getFileNamesArr = require('../helper').getFileNamesArr;

const consolidatedObj = {};

// Create a list of json paths of the files which will be concatenated
let fileNamesArr = getFileNamesArr(
  path.join(__dirname, '..', '..', '..', 'JSON', 'all_syllables_&_words')
);

fileNamesArr.forEach(fileName => {
  const identifier = fileName.slice(0, fileName.length - 5);

  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'all_syllables_&_words',
    fileName
  );

  let jsonArr = fs.readFileSync(filePath, 'utf8');
  jsonArr = JSON.parse(jsonArr).map(obj => {
    if (identifier === 'words100') {
      return obj.map(obj => {
        return Object.keys(obj)[0];
      });
    } else {
      return Object.keys(obj);
    }
  });

  consolidatedObj[identifier] = jsonArr;
});

// In which file to save
const writePath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'JSON',
  'consolidatedJSON',
  'syllables_&_words',
  'consolidatedSectionsArr.json'
);

fs.writeFile(writePath, JSON.stringify(consolidatedObj), function(err) {
  if (err) {
    return console.log(err);
  }

  notifier.notify('consolidatedJSON was saved!');
});
