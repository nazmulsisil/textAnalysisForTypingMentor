const fs = require('fs');
const path = require('path');
const start = new Date();

const readPath = path.join(
  __dirname,
  './../../../JSON/rank/words3kRankObj.json'
);

let rankObjArr = JSON.parse(fs.readFileSync(readPath, 'utf8'));

const searchKeys = 'was'
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
  rankObj.updateScore = eval('(' + rankObj.updateScore + ')');

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
    .slice(0, 20)
    .map(obj => {
      const upperCaseKeysArr = ''.split(',').map(l => l.toLowerCase());
      const word = obj._text;
      const upperCaseIsNeeded = upperCaseKeysArr.includes(
        word[0].toLowerCase()
      );

      if (upperCaseIsNeeded) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }

      // return obj['text'] + ': ' + obj['score'].toPrecision(3);
    })
    .join('|')
);

console.log(new Date() - start);
console.log('length: ' + newArr.length);

function updateScore(searchKeysObjArr, maxAllowedSerialNumOfWord) {
  if (this._serialNum <= maxAllowedSerialNumOfWord) {
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
}
