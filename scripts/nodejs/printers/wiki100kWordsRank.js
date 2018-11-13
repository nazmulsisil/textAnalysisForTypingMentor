const fs = require('fs');
const path = require('path');
const start = new Date();

const readPath = path.join(
  __dirname,
  './../../../JSON/rank/wiki100kWordsRankObj.json'
);

let rankObjArr = JSON.parse(fs.readFileSync(readPath, 'utf8'));

const searchKeys = [
  // { he: 10 },
  // { '1': 10 },
  { w: 10 },
  { a: 10 },
  { s: 10 },
  { z: 50 },
  { x: 50 },
  { t: 10 },
  { a: 10 }
  // { o: 10 },
  // { n: 10 },
  // { the: 12 },
  // { ing: 12 },
  // { and: 12 },
  // { her: 12 },
  // { tion: 50 },
  // { ther: 50 },
  // { ould: 50 },
  // { atio: 50 }
].map((weightObj, i, currArr) => {
  const totalWeightVal = currArr.reduce((prev, curr) => {
    return prev + Object.values(curr)[0];
  }, 0);
  return {
    [Object.keys(weightObj)[0]]: Object.values(weightObj)[0] / totalWeightVal
  };
});

rankObjArr.forEach(rankObj => {
  rankObj._updateScore = eval('(' + rankObj._updateScore + ')');

  rankObj._updateScore(searchKeys, 3000);
});

const newArr = rankObjArr
  .sort((a, b) => {
    return b._score - a._score;
  })
  .map(obj => {
    if (obj._score > 0) {
      return obj;
    }
  })
  .filter(Boolean);

console.log(
  newArr
    .slice(0, 20)
    .map(obj => {
      return obj._text;
      // return obj['text'] + ': ' + obj['score'].toPrecision(3);
    })
    .join('|')
);

console.log(new Date() - start);
console.log('length: ' + newArr.length);
