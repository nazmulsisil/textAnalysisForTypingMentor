const path = require('path');
const getWordsContainSyllable = require('../getWordsContainSyllable')
  .getWordsContainSyllable;
const start = new Date();

getWordsContainSyllable(
  path.join(__dirname, './../../../JSON/words/raw/words.json'),
  100,
  data => {
    console.log(
      data
        .map(el => {
          return Object.keys(el)[0];
        })
        .join('|')
    );
    console.log(new Date() - start);
  },
  '123456789',
  false,
  1
);
