const path = require('path');
const searchWordsFromArr = require('../searchWordsFromArr').searchWordsFromArr;
const start = new Date();

// Generates the words that contains specified letters/pattern
searchWordsFromArr(
  path.join(__dirname, './../../../JSON/all_words/wiki100kWords.json'),
  20,
  'tha',
  1,
  10000,
  true,
  data => {
    console.log(data.join('|'));
    console.log(new Date() - start);
  }
);
