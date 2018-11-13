const fs = require('fs');
const matchLetterInWord = require('./helper/matchLetterInWord')
  .matchLetterInWord;

exports.getWordsContainSyllable = function(
  jsonPath,
  topHowMany,
  callBack,
  keyword,
  fullMatch,
  minPercentageFoundInWord
) {
  let jsonObj;
  let mostFrequentSyllablesArr = [];

  fs.readFile(jsonPath, 'utf8', function(err, data) {
    if (err) throw err;

    jsonObj = JSON.parse(data);

    for (const syl in jsonObj) {
      if (jsonObj.hasOwnProperty(syl)) {
        if (fullMatch && matchLetterInWord(keyword, syl, fullMatch)) {
          const numOfTimesOccurred = jsonObj[syl];
          mostFrequentSyllablesArr.push({ [syl]: numOfTimesOccurred });
        } else if (fullMatch === false) {
          const numOfTimesOccurred = jsonObj[syl];
          if (
            numOfTimesOccurred > 500 &&
            (syl.length > 1 ||
              syl.toLowerCase() === 'i' ||
              syl.toLowerCase() === 'a')
          ) {
            mostFrequentSyllablesArr.push({
              [syl]: numOfTimesOccurred,
              found: matchLetterInWord(keyword, syl, fullMatch)
            });
          }
        }
      }
    }

    if (fullMatch) {
      mostFrequentSyllablesArr.sort((a, b) => {
        return Object.values(b)[0] - Object.values(a)[0];
      });
    } else if (fullMatch === false) {
      mostFrequentSyllablesArr.sort((a, b) => {
        return b.found - a.found;
      });
    }

    if (!fullMatch && minPercentageFoundInWord) {
      mostFrequentSyllablesArr = mostFrequentSyllablesArr.filter(el => {
        return el.found >= minPercentageFoundInWord;
      });
    }

    if (callBack) {
      callBack(mostFrequentSyllablesArr.slice(0, topHowMany));
    }

    // console.log(mostFrequentSyllablesArr.slice(0, topHowMany));
  });
};
