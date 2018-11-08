const path = require('path');
const notifier = require('node-notifier');
const fs = require('fs');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

const sourceFileName = 'quadSyllables.json';

// Getting all syllables from JSON
const syllables = getMostFrequentSyllables(
  path.join(__dirname, '..', '..', '..', 'JSON', 'selected', sourceFileName),
  undefined,
  undefined
);

// Getting average occurrences of first 10
const first10Avg =
  syllables
    .slice(0, 10)
    .reduce((prev, curr) => prev + Object.values(curr)[0], 0) / 10;

// Setting min occurrence
const minMark = first10Avg * 0.2;

// Getting min occurred syllables
const minMarkedSyllables = getMostFrequentSyllables(
  path.join(__dirname, '..', '..', '..', 'JSON', 'selected', sourceFileName),
  undefined,
  minMark
);

console.log('selected triSyllables: ' + syllables.length);
console.log('min marked triSyllables: ' + minMarkedSyllables.length);

const numOfMinMarkedSyllables = minMarkedSyllables.length;
const firstPartEndsAt = Math.floor(numOfMinMarkedSyllables * 0.37);
const secondPartEndsAt = Math.floor(numOfMinMarkedSyllables * 0.74);

const allPartsOfSyllables = [
  minMarkedSyllables.slice(0, firstPartEndsAt),
  minMarkedSyllables.slice(firstPartEndsAt, secondPartEndsAt),
  minMarkedSyllables.slice(secondPartEndsAt)
];

const finalJSONArr = [{}, {}, {}];

allPartsOfSyllables.forEach((part, i) => {
  part.forEach(syllableObj => {
    finalJSONArr[i][Object.keys(syllableObj)[0]] = Object.values(
      syllableObj
    )[0];
  });
});

console.log(numOfMinMarkedSyllables);
console.log(Object.keys(finalJSONArr[0]).length);
console.log(Object.keys(finalJSONArr[1]).length);
console.log(Object.keys(finalJSONArr[2]).length);
console.log(
  Object.keys(finalJSONArr[0]).length +
    Object.keys(finalJSONArr[1]).length +
    Object.keys(finalJSONArr[2]).length
);

// In which file to save
const jsonPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'JSON',
  'top',
  sourceFileName
);
fs.writeFile(jsonPath, JSON.stringify(finalJSONArr), function(err) {
  if (err) {
    return console.log(err);
  }

  notifier.notify('triSyllables was saved!');
});
