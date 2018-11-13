const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const getMostFrequentWords = require('../mostFrequent').getMostFrequentWords;

const sourceFileName = 'words.json';

let wordRaw = getMostFrequentWords(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'JSON',
    'words',
    'purified',
    sourceFileName
  ),
  1500,
  undefined
);

let words1100 = [];

wordRaw.forEach((wordObj, i) => {
  words1100.push({ [Object.keys(wordObj)[0]]: Object.values(wordObj)[0] });
});

console.log('words1100 length: ' + words1100.length);

const trimmedWords = {};

// Remove strange characters from word
words1100.forEach((obj, i) => {
  // if (i < 5) console.log(obj);
  const keyName = Object.keys(obj)[0];
  const newKeyName = keyName;

  trimmedWords[newKeyName] = trimmedWords[newKeyName]
    ? trimmedWords[newKeyName] + Object.values(obj)[0]
    : Object.values(obj)[0];
});

const final1100 = [];

// Removing duplicates but adding counts to a single entry
for (const wordIdentifier in trimmedWords) {
  if (trimmedWords.hasOwnProperty(wordIdentifier)) {
    const count = trimmedWords[wordIdentifier];

    if (
      wordIdentifier.length > 1 ||
      wordIdentifier === 'i' ||
      wordIdentifier === 'I' ||
      wordIdentifier === 'a' ||
      wordIdentifier === 'A'
    ) {
      final1100.push({
        [wordIdentifier]: count
      });
    }
  }
}

final1100.sort((a, b) => {
  return Object.values(b)[0] - Object.values(a)[0];
});

// console.log(final1100.slice(0, 10));

const wordListBreakdowns = [
  50,
  75,
  100,
  125,
  150,
  175,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000
];

const finalJSONArr = [];

wordListBreakdowns.forEach((count, i) => {
  const sliced = final1100.slice(0, count);

  finalJSONArr.push(sliced);
});

// console.log(finalJSONArr);

// In which file to save
const jsonPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'JSON',
  'words',
  'final',
  sourceFileName
);
fs.writeFile(jsonPath, JSON.stringify(finalJSONArr), function(err) {
  if (err) {
    return console.log(err);
  }

  notifier.notify(`${sourceFileName} was saved!`);
});

console.log('final1100 length: ' + final1100.length);
