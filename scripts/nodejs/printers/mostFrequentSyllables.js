const path = require('path');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

const syllables = getMostFrequentSyllables(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    // 'syllables',
    'triSyllables.json'
  ),
  50,
  undefined
);
// .map(el => Object.keys(el)[0]);

console.log(syllables);
