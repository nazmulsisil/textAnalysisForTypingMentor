const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const getFileNamesArr = require('../helper').getFileNamesArr;

const consolidatedArr = [];

// Create a list of json paths of the files which will be concatenated
let fileNamesArr = getFileNamesArr(
  path.join(__dirname, '..', '..', '..', 'JSON', 'all_syllables_&_words')
);

fileNamesArr.forEach(fileName => {
  const identifier = fileName.slice(0, fileName.length - 5);

  const readFile = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'all_syllables_&_words',
    fileName
  );

  let jsonArr = fs.readFileSync(readFile, 'utf8');
  jsonArr = JSON.parse(jsonArr);

  jsonArr.forEach((jsonObj, i, currArr) => {
    if (identifier === 'words') {
      if (i === currArr.length - 1) {
        for (const key in jsonObj) {
          if (jsonObj.hasOwnProperty(key)) {
            const obj = jsonObj[key];
            consolidatedArr.push(Object.keys(obj)[0]);
          }
        }
      }
    } else {
      for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
          consolidatedArr.push(key);
        }
      }
    }
  });
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
  'consolidatedArr.json'
);
fs.writeFile(writePath, JSON.stringify(consolidatedArr), function(err) {
  if (err) {
    return console.log(err);
  }

  notifier.notify(`consolidatedArr was saved!`);
});

console.log('consolidatedArr length: ' + consolidatedArr.length);
