const fs = require('fs');
const matchLetterInWord = require('./helper/matchLetterInWord')
  .matchLetterInWord;

exports.searchWordsFromArr = function(
  jsonPath,
  topHowMany,
  keyword,
  // percentageToMatch 1 means, 100% letters of the words should be from the keyword
  percentageToMatch,
  maxPositionInArr,
  noSwap,
  callBack
) {
  let jsonObj;
  let foundWordsArr = [];

  fs.readFile(jsonPath, 'utf8', function(err, data) {
    if (err) throw err;

    jsonObj = JSON.parse(data);

    jsonObj.slice(0, maxPositionInArr).forEach((word, i) => {
      if (
        word.length > 1 ||
        word.toLowerCase() === 'i' ||
        word.toLowerCase() === 'a'
      ) {
        if (topHowMany === undefined || topHowMany >= foundWordsArr.length) {
          const matchedPercentage = matchLetterInWord(keyword, word, noSwap);
          if (matchedPercentage >= percentageToMatch) {
            foundWordsArr.push(word);
          }
        }
      }
    });

    if (callBack) {
      callBack(foundWordsArr);
    }

    // console.log(foundWordsArr.slice(0, topHowMany));
  });
};
