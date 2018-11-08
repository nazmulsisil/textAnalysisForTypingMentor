const path = require('path');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

const foundWords = getMostFrequentSyllables(
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
  undefined
);

console.log(foundWords.length);
