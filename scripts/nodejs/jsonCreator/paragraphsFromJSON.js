const fs = require('fs');
const path = require('path');
const textFilter = require('../helper/textFilter').textFilter;

const readPath = path.join(
  __dirname,
  './../../../JSON/paragraphs/paragraphObjectsArr.json'
);

const writePath = path.join(
  __dirname,
  './../../../JSON/paragraphs/paragraphsArr.json'
);

fs.readFile(readPath, 'utf8', function(err, data) {
  console.log('All para total length: ' + data.length);
  if (err) throw err;
  const paragraphsArr = [];

  const arrOfParagraphsObj = JSON.parse(data);

  arrOfParagraphsObj.forEach(paraObj => {
    const txt = textFilter(paraObj._text);
    if (txt) {
      paragraphsArr.push(txt.trim());
    }
  });

  fs.writeFile(writePath, JSON.stringify(paragraphsArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('paragraph found: ' + paragraphsArr.length);
  });
});
