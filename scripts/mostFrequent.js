const fs = require('fs');

exports.getMostFrequentSyllables = function(jsonPath, topHowMany) {
  let jsonObj;
  const mostFrequentSyllablesArr = [];

  fs.readFile(jsonPath, 'utf8', function(err, data) {
    if (err) throw err;

    jsonObj = JSON.parse(data);

    for (const syl in jsonObj) {
      if (jsonObj.hasOwnProperty(syl)) {
        const numOfTimesOccurred = jsonObj[syl];

        mostFrequentSyllablesArr.push({ [syl]: numOfTimesOccurred });
      }
    }

    mostFrequentSyllablesArr.sort((a, b) => {
      return Object.values(b)[0] - Object.values(a)[0];
    });

    console.log(mostFrequentSyllablesArr.slice(0, topHowMany));
  });
};
