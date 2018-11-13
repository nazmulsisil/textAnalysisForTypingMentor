const fs = require('fs');
const path = require('path');

const readPath = path.join(
  __dirname,
  './../../../text_consolidated/wiki100kWords.txt'
);
const writePath = path.join(
  __dirname,
  './../../../JSON/all_words/wiki100kWords.json'
);

const start = new Date();

const dict = fs.readFileSync(
  path.join(__dirname, './../../../JSON/all_words/dictionary.json'),
  'utf8'
);
const dictionary = JSON.parse(dict).map(word => {
  return word.toLowerCase();
});

console.log('1. dictionary length: ' + dictionary.length);

fs.readFile(readPath, 'utf8', function(err, data) {
  console.log('2. wiki100kWords length: ' + data.length);
  if (err) throw err;
  const wordArr = [];
  data.split('\n').forEach(currWord => {
    const word = currWord.toLowerCase();

    if (
      word.length > 1 ||
      word.toLowerCase() === 'i' ||
      word.toLowerCase() === 'a'
    ) {
      if (!wordArr.includes(word)) {
        if (word === 'the' && !dictionary.includes(word)) {
          console.log('the - excluded');
        }
        if (dictionary.includes(word)) {
          wordArr.push(currWord);
        }
      }
    }
  });

  fs.writeFile(writePath, JSON.stringify(wordArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('words found: ' + wordArr.length);
  });
});
