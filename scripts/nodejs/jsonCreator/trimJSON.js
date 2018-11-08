const path = require('path');
const notifier = require('node-notifier');
const fs = require('fs');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

const syllables = getMostFrequentSyllables(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'selected',
    'triSyllables.json'
  ),
  undefined,
  150000
);

const finalJSONObj = {};

syllables.forEach(syllableObj => {
  finalJSONObj[Object.keys(syllableObj)[0]] = Object.values(syllableObj)[0];
});

console.log('total: ' + Object.keys(finalJSONObj).length);
console.log(finalJSONObj);

// In which file to save
const jsonPath = path.join(__dirname, './../../../JSON/top/triSyllables.json');
fs.writeFile(jsonPath, JSON.stringify(finalJSONObj), function(err) {
  if (err) {
    return console.log(err);
  }

  notifier.notify('Hi Sisil, triSyllables was saved!');
});
