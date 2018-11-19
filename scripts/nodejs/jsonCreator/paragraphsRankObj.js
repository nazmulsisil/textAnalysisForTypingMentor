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
  constructor(text, keysArr) {
    this._text = text;
    this._score = 0;

    keysArr.forEach(key => {
      const matchedArr = getIndicesOf(key, text, true);

      if (matchedArr && matchedArr.length > 0) {
        this[key] = (matchedArr.length * key.length) / text.length;
      }
    });
  }
}

const paragraphsRankWriteFile = path.join(
  __dirname,
  './../../../JSON/rank/paragraphsRankObj.json'
);

const wordsReadFile = path.join(
  __dirname,
  './../../../JSON/paragraphs/paragraphsArr.json'
);

const keysReadFile = path.join(
  __dirname,
  './../../../JSON/consolidatedJSON/syllables_&_words/consolidatedArr.json'
);

let keysArr = JSON.parse(fs.readFileSync(keysReadFile, 'utf8'));
let paragraphsArr = JSON.parse(fs.readFileSync(wordsReadFile, 'utf8'));

let textRankArr = paragraphsArr
  .map((text, i) => {
    if (text.length > 0) {
      return new TextObjForRanking(text, keysArr, i);
    }
  })
  .filter(Boolean);

fs.writeFile(paragraphsRankWriteFile, JSON.stringify(textRankArr), function(
  err
) {
  if (err) throw err;
  console.log('complete');
});
