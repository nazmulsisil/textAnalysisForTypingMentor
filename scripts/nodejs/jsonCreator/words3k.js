const fs = require('fs');
const path = require('path');

const readPath = path.join(__dirname, './../../../text_finalized/words3k.txt');
const writePath = path.join(
  __dirname,
  './../../../JSON/all_words/words3k.json'
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
  console.log('2. words3k text length: ' + data.length);
  if (err) throw err;
  const wordArr = [];
  data.split('\r\n').forEach(currWord => {
    const word = currWord.toLowerCase();
    wordArr.push(currWord);
  });

  fs.writeFile(writePath, JSON.stringify(wordArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('words found: ' + wordArr.length);
  });
});
