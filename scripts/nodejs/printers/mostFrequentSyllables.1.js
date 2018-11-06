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
    // 'syllables',
    'triSyllables.json'
  ),
  undefined,
  10,
  data => {
    // console.log(data);
    console.log(data.map(el => Object.keys(el)[0]).length);
    // console.log(data.slice(-100));
  }
);
