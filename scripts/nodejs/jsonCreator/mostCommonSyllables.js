const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const getFileNamesArr = require('../helper').getFileNamesArr;

const filesToExclude = ['noSyllables.json'];

const consolidatedArr = [];

// Create a list of json paths of the files which will be concatenated
let fileNamesArr = getFileNamesArr(
  path.join(__dirname, './../../../JSON/syllables/syllables_raw')
).filter(fileName => !filesToExclude.includes(fileName));

fileNamesArr.forEach(fileName => {
  const identifier = fileName.slice(0, fileName.length - 5);

  const readFile = path.join(
    __dirname,
    './../../../JSON/syllables/syllables_raw',
    fileName
  );

  let jsonObj = JSON.parse(fs.readFileSync(readFile, 'utf8'));

  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) {
      const frequency = jsonObj[key];
      consolidatedArr.push({
        [key]: parseInt(frequency, 10)
      });
    }
  }
});

consolidatedArr.sort((a, b) => {
  return Object.values(b)[0] - Object.values(a)[0];
});

const firstXItems = 10000;
const totalOfFirstXManyItems = consolidatedArr
  .slice(0, firstXItems)
  .reduce((prev, curr) => prev + Object.values(curr)[0], 0);
const avgOfFirstXManyItems = totalOfFirstXManyItems / firstXItems;
const minMark = parseInt(avgOfFirstXManyItems * 0.02, 10);

console.log('minMark: ' + minMark);

const topPatternsArr = consolidatedArr
  .filter(obj => {
    return Object.values(obj)[0] > minMark;
  })
  .map(obj => {
    return Object.keys(obj)[0];
  });

console.log(topPatternsArr.length);

const writePath = path.join(
  __dirname,
  './../../../JSON/syllables/selected/sixSyllablesTop30.json'
);

// Most common 30 patterns of 2 keys
fs.writeFile(
  writePath,
  JSON.stringify(
    topPatternsArr
      .filter(word => {
        return !word.includes(' ');
      })
      .filter(word => {
        return word.length === 6;
      })
      .slice(0, 30)
  ),
  () => {
    console.log('completed');
  }
);
