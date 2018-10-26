const path = require('path');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

getMostFrequentSyllables(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'syllables',
    'triSyllables.json'
  ),
  40,
  data => {
    console.log(data);
  }
);
