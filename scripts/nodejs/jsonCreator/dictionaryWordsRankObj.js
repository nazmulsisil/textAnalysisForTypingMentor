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
    this.text = text;

    keysArr.forEach(key => {
      const matchedArr = getIndicesOf(key, text);

      if (matchedArr && matchedArr.length > 0) {
        this[key] = matchedArr.length / text.length;
      }
    });
  }
}

const wordsRankWriteFile = path.join(
  __dirname,
  './../../../JSON/rank/dictionaryWordsRankObj.json'
);

const keysReadFile = path.join(
  __dirname,
  './../../../JSON/consolidatedJSON/syllables_&_words/consolidatedArr.json'
);

const wordsReadFile = path.join(
  __dirname,
  './../../../text_consolidated/dictionary.txt'
);

let keysArr = JSON.parse(fs.readFileSync(keysReadFile, 'utf8'));
let dictionaryArr = fs.readFileSync(wordsReadFile, 'utf8').split('\r\n');

let textRankArr = dictionaryArr.map((text, i) => {
  if (i < 10000) {
    return new TextObjForRanking(text, keysArr);
  }
});

textRankArr = textRankArr.filter(Boolean);

fs.writeFile(wordsRankWriteFile, JSON.stringify(textRankArr), function(err) {
  if (err) throw err;
  console.log('complete: ' + textRankArr.length + ' items.');
});
