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
    'words',
    'words_with_0_letters.json'
  ),
  40,
  undefined,
  data => {
    console.log(data);
  }
);
