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
    'syllables',
    'triSyllables.json'
  ),
  100,
  undefined
);

const finalJSONObj = {};

syllables.forEach(syllableObj => {
  finalJSONObj[Object.keys(syllableObj)[0]] = Object.values(syllableObj)[0];
});

console.log(finalJSONObj);

const jsonPath = path.join(
  __dirname,
  './../../../JSON/final/triSyllables.json'
);
fs.writeFile(jsonPath, JSON.stringify(finalJSONObj), function(err) {
  if (err) {
    return console.log(err);
  }

  notifier.notify('Hi Sisil, File was saved!');
});
