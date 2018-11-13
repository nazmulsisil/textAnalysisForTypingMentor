const fs = require('fs');
const path = require('path');

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

class TextObjForRanking {
  constructor(text, keysArr, serialNum) {
    this._text = text;
    this._score = 0;
    this._serialNum = serialNum;

    keysArr.forEach(key => {
      const matchedArr = getIndicesOf(key, text, true);

      if (matchedArr && matchedArr.length > 0) {
        this[key] = (matchedArr.length * key.length) / text.length;
      }
    });

    this._updateScore = `function(searchKeysObjArr, maxAllowedSerialNumOfWord) {
      if (this._serialNum <= maxAllowedSerialNumOfWord) {
        searchKeysObjArr.forEach(keyObj => {
          const key = Object.keys(keyObj)[0];
          const weight = Object.values(keyObj)[0];
          const keyScore = this[key];
          this._score += (keyScore ? keyScore : 0) * weight;
        });
      }
    }`;
  }
}

const wordsRankWriteFile = path.join(
  __dirname,
  './../../../JSON/rank/words3kRankObj.json'
);

const wordsReadFile = path.join(
  __dirname,
  './../../../JSON/all_words/words3k.json'
);

const keysReadFile = path.join(
  __dirname,
  './../../../JSON/consolidatedJSON/syllables_&_words/consolidatedArr.json'
);

let keysArr = JSON.parse(fs.readFileSync(keysReadFile, 'utf8'));
let wordsArr = JSON.parse(fs.readFileSync(wordsReadFile, 'utf8'));

let textRankArr = wordsArr.map((text, i) => {
  return new TextObjForRanking(text, keysArr, i);
});

// EXPIRE: 7days
// textRankArr.sort((a, b) => {
//   return b.totalScore - a.totalScore;
// });

fs.writeFile(wordsRankWriteFile, JSON.stringify(textRankArr), function(err) {
  if (err) throw err;
  console.log('complete');
});
