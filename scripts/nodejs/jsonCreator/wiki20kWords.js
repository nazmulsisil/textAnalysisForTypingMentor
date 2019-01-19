const fs = require('fs');
const path = require('path');

const readPath = path.join(
  __dirname,
  './../../../text_consolidated/wiki100kWords.txt'
);
const writePath = path.join(
  __dirname,
  './../../../JSON/all_words/wiki20kWords.json'
);

const start = new Date();

const dict = fs.readFileSync(
  path.join(__dirname, './../../../JSON/all_words/dictionary.json'),
  'utf8'
);
const dictionary = JSON.parse(dict);
// .map(word => {
//   return word.toLowerCase();
// });

console.log('1. dictionary length: ' + dictionary.length);

// other than 5k words, rest are taken from wiki100k words to gather 20k words
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
        // if (word === 'the' && !dictionary.includes(word)) {
        //   console.log('the - excluded');
        // }
        if (dictionary.includes(word)) {
          wordArr.push(currWord);
        }
      }
    }
  });

  const words5k = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        './../../../JSON/all_words/wordFrequencyOrg5kArr.json'
      )
    )
  );

  fs.writeFile(
    writePath,
    JSON.stringify(
      Array.from(new Set(words5k.concat(wordArr))).slice(0, 20000)
    ),
    function(err) {
      if (err) throw err;
      console.log('complete');
      console.log('words found: ' + wordArr.length);
    }
  );
});
