const path = require('path');
const getMostFrequentSyllables = require('./mostFrequent')
  .getMostFrequentSyllables;

const myListPath = path.join(__dirname, './../../JSON/words/raw/words.json');
const allWordsPath = path.join(
  __dirname,
  './../../JSON/all_words/testWords.json'
);

const myList = getMostFrequentSyllables(myListPath, 3000).map(obj => {
  return Object.keys(obj)[0].toLowerCase();
});

const allWords = getMostFrequentSyllables(allWordsPath).map(obj => {
  return Object.values(Object.values(obj)[0])[0].toLowerCase();
});

const mySet = new Map();

[...myList, ...allWords].forEach(word => {
  mySet.set(word);
});

console.log(
  (mySet.size - Math.max(myList.length, allWords.length)) /
    (myList.length + allWords.length)
);

console.log('mySet: ' + mySet.size);
console.log('myList: ' + myList.length);
console.log('allWords: ' + allWords.length);
