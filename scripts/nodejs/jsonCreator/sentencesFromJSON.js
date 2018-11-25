const fs = require('fs');
const path = require('path');
const textFilter = require('../helper/textFilter').textFilter;
const capitalizeFirstLetter = require('../helper/functions')
  .capitalizeFirstLetter;

const readPath = path.join(
  __dirname,
  './../../../JSON/paragraphs/paragraphObjectsArr.json'
);

const writePath = path.join(
  __dirname,
  './../../../JSON/sentences/sentencesArr.json'
);

fs.readFile(readPath, 'utf8', function(err, data) {
  console.log('All sentences total length: ' + data.length);
  if (err) throw err;
  const sentencesArr = [];

  const arrOfParagraphsObj = JSON.parse(data);

  arrOfParagraphsObj.forEach(paraObj => {
    const txt = textFilter(paraObj.text).trim();
    if (txt) {
      txt.split(/(?<=[.!?;])\s+(?=[A-Za-z0-9])/g).forEach(sentence => {
        if (sentence.trim().length > 20) {
          sentencesArr.push(capitalizeFirstLetter(sentence.trim()));
        }
      });
    }
  });

  fs.writeFile(writePath, JSON.stringify(sentencesArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('paragraph found: ' + sentencesArr.length);
  });
});
