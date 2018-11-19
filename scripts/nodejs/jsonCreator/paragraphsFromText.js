const fs = require('fs');
const path = require('path');
const textFilter = require('../helper/textFilter').textFilter;

const readPath = path.join(
  __dirname,
  './../../../text_consolidated/paragraphs.txt'
);

const writePath = path.join(
  __dirname,
  './../../../JSON/paragraph/paragraphsArr.json'
);

fs.readFile(readPath, 'utf8', function(err, data) {
  console.log('All para total length: ' + data.length);
  if (err) throw err;
  const paragraphsArr = [];

  data.split('\r\n').forEach(currPara => {
    const txt = textFilter(currPara);
    if (txt) {
      paragraphsArr.push(txt);
    }
  });

  fs.writeFile(writePath, JSON.stringify(paragraphsArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('paragraph found: ' + paragraphsArr.length);
  });
});
