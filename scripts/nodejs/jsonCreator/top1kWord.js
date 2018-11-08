const fs = require('fs');
const notifier = require('node-notifier');
const path = require('path');
const getMostFrequentSyllables = require('../mostFrequent')
  .getMostFrequentSyllables;

const sourceFileName = 'words.json';

let wordRaw = getMostFrequentSyllables(
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
  undefined,
  undefined
);

let words1100 = [];

for (const identifier in wordRaw[0]['0']) {
  if (wordRaw[0]['0'].hasOwnProperty(identifier)) {
    const count = wordRaw[0]['0'][identifier];
    words1100.push({ [identifier]: count });
  }
}

console.log('words1100: ' + words1100.length);
console.log(words1100);

// for example purpose I reassigned the following Array
// words1100 = [
//   { '$help.': 1 },
//   { 'help.': 1 },
//   { help: 1 },
//   { 'he00()"lp': 1 },
//   { man: 40 }
// ];

const trimmedWords = {};

// Remove strange characters from word
words1100.forEach(obj => {
  const keyName = Object.keys(obj)[0];
  // const newKeyName = Array.from(keyName)
  //   .filter(char => {
  //     return /[a-zA-Z]/g.test(char);
  //   })
  //   .join('');

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
      wordIdentifier === 'I'
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

const finalJSONArr = [...Array(wordListBreakdowns.length)].map(() => ({}));

wordListBreakdowns.map((count, i) => {
  const sliced = final1100.slice(0, count);

  sliced.forEach(wordObj => {
    finalJSONArr[i][Object.keys(wordObj)[0]] = Object.values(wordObj)[0];
  });
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
