const path = require('path');
const getWordsContainSyllable = require('../getWordsContainSyllable')
  .getWordsContainSyllable;

getWordsContainSyllable(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'words',
    'words_with_0_letters.json'
  ),
  100,
  data => {
    console.log(
      data
      // .map(el => {
      //   return Object.keys(el)[0];
      // })
      // .join('|')
    );
  },
  'uiopjklnm,yh',
  false,
  0.5
);
