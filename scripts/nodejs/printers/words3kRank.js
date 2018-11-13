const fs = require('fs');
const path = require('path');
const start = new Date();

const readPath = path.join(
  __dirname,
  './../../../JSON/rank/words3kRankObj.json'
);

let rankObjArr = JSON.parse(fs.readFileSync(readPath, 'utf8'));

const searchKeys = [{ Q: 10 }, { W: 10 }, { E: 10 }].map(
  (weightObj, i, currArr) => {
    const totalWeightVal = currArr.reduce((prev, curr) => {
      return prev + Object.values(curr)[0];
    }, 0);
    return {
      [Object.keys(weightObj)[0]]: Object.values(weightObj)[0] / totalWeightVal
    };
  }
);

rankObjArr.forEach(rankObj => {
  rankObj._updateScore = eval('(' + rankObj._updateScore + ')');

  rankObj._updateScore(searchKeys, 99999999);
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
