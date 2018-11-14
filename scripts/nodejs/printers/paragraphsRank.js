const fs = require('fs');
const path = require('path');
const start = new Date();

const readPath = path.join(
  __dirname,
  './../../../JSON/rank/paragraphsRankObj.json'
);

let rankObjArr = JSON.parse(fs.readFileSync(readPath, 'utf8'));

const searchKeys = 'brain'
  .split(',')
  .map(char => {
    return { [char]: 10 };
  })
  .map((weightObj, i, currArr) => {
    const totalWeightVal = currArr.reduce((prev, curr) => {
      return prev + Object.values(curr)[0];
    }, 0);
    return {
      [Object.keys(weightObj)[0]]: Object.values(weightObj)[0] / totalWeightVal
    };
  });

rankObjArr.forEach(rankObj => {
  updateScore.call(rankObj, searchKeys);
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
    .slice(0, 1)
    .map(obj => {
      return obj['_text'];

      // return obj['text'] + ': ' + obj['score'].toPrecision(3);
    })
    .join('|')
);

console.log(new Date() - start);
console.log('length: ' + newArr.length);

function updateScore(searchKeysObjArr) {
  searchKeysObjArr.forEach(keyObj => {
    const key = Object.keys(keyObj)[0];
    const keyIsUpperCase = key === key.toUpperCase();
    const weight = Object.values(keyObj)[0];
    let keyScore = this[key];

    if (keyScore) {
      this._score += keyScore * weight;
    } else if (keyIsUpperCase) {
      const firstCharMatchedCaseInsensitively =
        key.toLowerCase() === this._text[0].toLowerCase();

      if (firstCharMatchedCaseInsensitively) {
        // Following 1 is taken hard coded cus only first one letter is only eligible for being capitalized
        keyScore = 1 / this._text.length;
        this._score += keyScore * weight;
      }
    }
  });
}
