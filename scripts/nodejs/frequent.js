const fs = require('fs');
const path = require('path');
const notifier = require('node-notifier');
const emptyJSON = require('./emptyJSON.js').emptyJSON;
const getSyllables = require('./syllables.js').getSyllables;
const updateJSON = require('./updateJSON.js').updateJSON;
const getMostFrequentSyllables = require('./mostFrequent')
  .getMostFrequentSyllables;
const getFileNamesArr = require('./helper').getFileNamesArr;

let start = new Date();

const one = {
  fileName: 'noSyllables.json',
  count: 1
};
const two = {
  fileName: 'diSyllables.json',
  count: 2
};
const three = {
  fileName: 'triSyllables.json',
  count: 3
};
const four = {
  fileName: 'quadSyllables.json',
  count: 4
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

// In case rather than generating syllables mathematically,
// instead you want to read syllables from a file use syllablesJSONPath
const syllablesJSONPath = path.join(
  __dirname,
  '..',
  '..',
  'JSON',
  'syllables',
  'triSyllables.json'
);

// empty-ing the json file that is going to get new data.
const jsonPath = path.join(
  __dirname,
  '..',
  '..',
  'JSON',
  numberOfSyllables.fileName
);
emptyJSON(jsonPath);

// TODO: generate all the possible syllables
const syllables = getSyllables(
  'acdefghilnorstuwTmbv ',
  numberOfSyllables.count,
  // If you don't want to mathematically generate, rather want to read
  // from a certain file, then use following 3 arguments
  syllablesJSONPath,
  100,
  undefined
);
console.log('syllablesArr length: ' + syllables.length);
// console.log(syllables);

/////////////////////
let fileNamesArr = getFileNamesArr(
  path.join(__dirname, '..', '..', 'text_lab_full')
);

// TODO: shortening the array for testing purpose, taking 1 file
// fileNamesArr = fileNamesArr.slice(0, 1);

let filePathsArr = fileNamesArr.map(fileName => {
  return path.join(__dirname, '..', '..', 'text_lab_full', fileName);
});

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
  // console.log(filePath);
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
        console.log((new Date() - start) / (60 * 60 * 1000) + ' hrs');
        // console.log((new Date() - start) / (60 * 1000) + ' mins');

        notifier.notify('Hi Sisil, quadSyllables.json was saved!');
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
