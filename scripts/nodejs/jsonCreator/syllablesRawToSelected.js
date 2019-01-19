const fs = require('fs');
const path = require('path');

const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

const readPath = path.join(
  __dirname,
  './../../../JSON/syllables/syllables_raw/quadSyllables.json'
);

const mostFreqSyllables = getMostFrequentSyllables(readPath, undefined, 50)
  // removing space included syllables
  .filter(sylObj => {
    return !Object.keys(sylObj)[0].includes(' ');
  })
  // converting array of objects to a pain object
  .reduce((prevObj, currObj) => {
    prevObj[Object.keys(currObj)[0]] = Object.values(currObj)[0];
    return prevObj;
  }, {});

const writePath = path.join(
  __dirname,
  './../../../JSON/syllables/selected/quadSyllables.json'
);

fs.writeFileSync(writePath, JSON.stringify(mostFreqSyllables));
