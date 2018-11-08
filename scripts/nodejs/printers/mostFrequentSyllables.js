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
    'selected',
    'quadSyllables.json'
  ),
  undefined,
  undefined
);

console.log(syllables.length);
