const fs = require('fs');

exports.getMostFrequentSyllables = function(
  jsonPath,
  topHowMany,
  minOccurred,
  callBack
) {
  // let jsonObj;
  const mostFrequentSyllablesArr = [];

  let jsonObj = fs.readFileSync(jsonPath, 'utf8');
  jsonObj = JSON.parse(jsonObj);

  for (const syl in jsonObj) {
    if (jsonObj.hasOwnProperty(syl)) {
      const numOfTimesOccurred = jsonObj[syl];
      if (!minOccurred || numOfTimesOccurred >= minOccurred)
        mostFrequentSyllablesArr.push({ [syl]: numOfTimesOccurred });
    }
  }

  mostFrequentSyllablesArr.sort((a, b) => {
    return Object.values(b)[0] - Object.values(a)[0];
  });

  return mostFrequentSyllablesArr.slice(
    0,
    topHowMany ? topHowMany : mostFrequentSyllablesArr.length
  );
};
