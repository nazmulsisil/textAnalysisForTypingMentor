const fs = require('fs');

// sync
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

  console.log(
    'mostFrequentSyllablesArr length: ' + mostFrequentSyllablesArr.length
  );
  const start = new Date();
  mostFrequentSyllablesArr.sort((a, b) => {
    return Object.values(b)[0] - Object.values(a)[0];
  });
  console.log('time taken ms: ' + (new Date() - start));
  return mostFrequentSyllablesArr.slice(
    0,
    topHowMany ? topHowMany : mostFrequentSyllablesArr.length
  );
};

exports.getMostFrequentWords = function(
  jsonPath,
  topHowMany,
  minOccurred,
  callBack
) {
  // let jsonObj;
  const mostFrequentWordsArr = [];

  // Reading from a json array of objects
  let jsonObj = fs.readFileSync(jsonPath, 'utf8');
  jsonObj = JSON.parse(jsonObj);

  jsonObj.forEach(obj => {
    const word = Object.keys(obj)[0];
    const occurred = Object.values(obj)[0];

    if (!minOccurred || occurred >= minOccurred) {
      mostFrequentWordsArr.push({ [word]: occurred });
    }
  });

  console.log('mostFrequentWordsArr length: ' + mostFrequentWordsArr.length);
  const start = new Date();
  mostFrequentWordsArr.sort((a, b) => {
    return Object.values(b)[0] - Object.values(a)[0];
  });
  console.log('time taken ms: ' + (new Date() - start));
  return mostFrequentWordsArr.slice(
    0,
    topHowMany ? topHowMany : mostFrequentWordsArr.length
  );
};
