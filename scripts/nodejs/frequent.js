const fs = require('fs');
const path = require('path');
const emptyJSON = require('./emptyJSON.js').emptyJSON;
const getSyllables = require('./syllables.js').getSyllables;
const updateJSON = require('./updateJSON.js').updateJSON;
const getMostFrequentSyllables = require('./mostFrequent')
  .getMostFrequentSyllables;
const getFileNamesArr = require('./helper').getFileNamesArr;

const two = {
  fileName: 'diSyllables.json',
  count: 2
};
const three = {
  fileName: 'triSyllables.json',
  count: 3
};

const word = {
  fileName: 'words.json',
  count: 0
};

const test = {
  fileName: 'words_with_0_letters.json',
  count: 0
};

// TODO: how many syllables?
const numberOfSyllables = three;

// empty-ing the json file at the starting of this file execution.
const jsonPath = path.join(__dirname, '..', 'JSON', numberOfSyllables.fileName);
emptyJSON(jsonPath);

// TODO: generate all the possible syllables
const syllables = getSyllables(
  'abcdefghijklmnopqrstuvwxyz',
  numberOfSyllables.count
);

// Which file to read from
// const filePath = 'downloadedText/GeraldineATaleOfConscience_djvu.txt';

/////////////////////
let fileNamesArr = getFileNamesArr(path.join(__dirname, '..', 'text_lab'));
let filePathsArr = fileNamesArr.map(fileName => {
  return path.join(__dirname, '..', 'text_lab', fileName);
});
// filePathsArr = filePathsArr.slice(0, 2);

// creating syllables arr to loop
const syllablesArrToLoop = [];
syllables.forEach(syllable => {
  const SyllablesArrToPush = [...Array(filePathsArr.length)].map(
    () => syllable
  );
  syllablesArrToLoop.push(...SyllablesArrToPush);
});
// console.log(syllablesArrToLoop);
///// end of creating syllables arr to loop /////////

// creating file paths arr to loop
let filePathsArrToLoop = [];
syllables.forEach(syllable => {
  filePathsArrToLoop.push(...filePathsArr);
});
// console.log(filePathsArrToLoop);
///// end of creating file paths arr to loop /////////

// //////// For syllable //////////////
const syllablesObj = {};
let counter = 0;

(function recursion(syllable, filePath) {
  updateJSON(syllable, filePath, syllablesObj).then(updatedSyllablesObj => {
    counter++;
    if (syllablesArrToLoop[counter] !== undefined) {
      recursion(syllablesArrToLoop[counter], filePathsArrToLoop[counter]);
    } else {
      fs.writeFile(jsonPath, JSON.stringify(updatedSyllablesObj), function(
        err
      ) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
        getMostFrequentSyllables(jsonPath, 10);
      });
    }
  });
})(syllablesArrToLoop[counter], filePathsArrToLoop[counter]);

///////// end of syllables ///////////////

// ///////// for words /////////////

// function parentFunction(numOfLetters) {
//   return new Promise((sFn1, fFn) => {
//     let syllablesObj = {};
//     let counter = 0;
//     (function recursion(syllable, filePath, numOfLetters) {
//       updateJSON(syllable, filePath, syllablesObj, numOfLetters).then(
//         updatedSyllablesObj => {
//           counter++;
//           if (filePathsArr[counter] !== undefined) {
//             recursion(
//               syllablesArrToLoop[counter],
//               filePathsArr[counter],
//               numOfLetters
//             );
//           } else {
//             const newPath = path.join(
//               __dirname,
//               '..',
//               'JSON',
//               `words_with_${numOfLetters}_letters.json`
//             );

//             fs.writeFile(newPath, JSON.stringify(updatedSyllablesObj), function(
//               err
//             ) {
//               if (err) {
//                 return console.log(err);
//               }
//               console.log('The file was saved!!');
//               getMostFrequentSyllables(newPath, 5);
//             });

//             sFn1('letter layer completed');
//           }
//         }
//       );
//     })(syllablesArrToLoop[counter], filePathsArr[counter], numOfLetters);
//   });
// }

// let numOfLetters = 0;

// (function grandFunction(numOfLetters) {
//   parentFunction(numOfLetters).then(result => {
//     numOfLetters++;
//     if (numOfLetters < 50) {
//       grandFunction(numOfLetters);
//     }
//   });
// })(numOfLetters);

// ///////// end of words ///////////////
