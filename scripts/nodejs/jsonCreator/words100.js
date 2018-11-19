const fs = require('fs');
const path = require('path');

const readPath = path.join(
  __dirname,
  './../../../text_consolidated/words100.txt'
);
const writePath = path.join(
  __dirname,
  './../../../JSON/words/final/words100.json'
);

fs.readFile(readPath, 'utf8', function(err, data) {
  console.log('words100 text length: ' + data.length);
  if (err) throw err;
  const wordArr = [];
  data.split('\r\n').forEach(currWord => {
    if (currWord) {
      wordArr.push(currWord);
    }
  });

  objectifiedWordArr = wordArr.map((word, i, currArr) => {
    return { [word]: currArr.length - i };
  });

  fs.writeFile(writePath, JSON.stringify(objectifiedWordArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('words found: ' + wordArr.length);
  });
});
