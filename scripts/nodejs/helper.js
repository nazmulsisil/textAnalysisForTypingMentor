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
