const fs = require('fs');

exports.updateObjProp = function(obj, propKey, propVal) {
  if (obj[propKey]) {
    obj[propKey] = obj[propKey] + propVal;
  } else {
    obj[propKey] = propVal;
  }
};

exports.getFileNamesArr = function(folderPath) {
  const myArr = [];

  fs.readdirSync(folderPath).forEach(file => {
    myArr.push(file);
  });

  return myArr;
};

exports.capsRatio = function(str) {
  let numOfCaps = 0;
  let numOfChars = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    numOfChars++;
    if (/\w/g.test(char) && char === char.toUpperCase()) {
      numOfCaps++;
    }
  }

  return numOfCaps / numOfChars;
};

exports.numberRatioInText = function(str) {
  let numOfNumberChars = 0;
  let numOfChars = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    numOfChars++;
    if (/\w/g.test(char) && char === char.toUpperCase()) {
      numOfNumberChars++;
    }
  }

  return numOfNumberChars / numOfChars;
};
