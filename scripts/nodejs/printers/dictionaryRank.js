const fs = require('fs');
const path = require('path');
const start = new Date();

const readPath = path.join(
  __dirname,
  './../../../JSON/rank/dictionaryWordsRankObj.json'
);

let rankObjArr = JSON.parse(fs.readFileSync(readPath, 'utf8'));

const newArr = rankObjArr.sort((a, b) => {
  // if (a.text === `ain't`) {
  //   console.log(a.text);
  // }

  // searchFor key has to already exist in consolidatedJSONArr
  const searchFor = 'atio';

  const aSc = a[searchFor] ? a[searchFor] : 0;
  const bSc = b[searchFor] ? b[searchFor] : 0;
  return bSc - aSc;
});

console.log(
  newArr.slice(0, 10).map(obj => {
    return obj['text'];
  })
);

console.log(new Date() - start);
