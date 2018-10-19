const fs = require('fs');
const updateObjProp = require('./helper').updateObjProp;

// for syllables
exports.updateJSON = function(syllable, filePath, syllablesObj) {
  return new Promise((sFn, fFn) => {
    const readStream = fs.createReadStream(filePath, {
      encoding: 'utf8',
      highWaterMark: 1000
    });

    readStream.on('data', function(result) {
      const myRegex = new RegExp(syllable, 'g');
      const matchedDataArr = result.toString().match(myRegex);
      const numOfOccurrences = matchedDataArr ? matchedDataArr.length : 0;

      updateObjProp(syllablesObj, syllable, numOfOccurrences);
    });

    readStream.on('end', function() {
      if (syllablesObj) sFn(syllablesObj);
      else fFn('failed');
    });
  });
};

// // for words
// exports.updateJSON = function(syllable, filePath, syllablesObj, length) {
//   return new Promise((sFn, fFn) => {
//     const readStream = fs.createReadStream(filePath, {
//       encoding: 'utf8',
//       highWaterMark: 1000
//     });

//     readStream.on('data', function(result) {
//       result.split(' ').forEach(word => {
//         if (word.length > length) {
//           updateObjProp(syllablesObj, word, 1);
//         }
//       });
//     });

//     readStream.on('end', function() {
//       if (syllablesObj) sFn(syllablesObj);
//       else fFn('failed');
//     });
//   });
// };
