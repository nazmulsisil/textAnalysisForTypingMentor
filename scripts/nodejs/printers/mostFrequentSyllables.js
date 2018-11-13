const path = require('path');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;
const start = new Date();

const syllables = getMostFrequentSyllables(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'syllables',
    'top',
    'noSyllables.json'
  ),
  undefined,
  undefined
);

console.log('syllables length: ' + syllables.length);
console.log('time taken total: ' + (new Date() - start));
