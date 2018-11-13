const fs = require('fs');
const path = require('path');

const readPath = path.join(
  __dirname,
  './../../../text_consolidated/dictionary.txt'
);
const writePath = path.join(
  __dirname,
  './../../../JSON/all_words/dictionary.json'
);

const start = new Date();

fs.readFile(readPath, 'utf8', function(err, data) {
  if (err) throw err;
  const myArr = data.split('\r\n');

  fs.writeFile(writePath, JSON.stringify(myArr), function(err) {
    if (err) throw err;
    console.log('complete');
  });
});
