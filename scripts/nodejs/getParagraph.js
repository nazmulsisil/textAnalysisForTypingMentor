const fs = require('fs');
const path = require('path');
const chance = new (require('chance'))();
const getTextLengthOfFile = require('./getTextLengthOfFile')
  .getTextLengthOfFile;
const getFileNamesArr = require('./helper').getFileNamesArr;
const numberRatioInText = require('./helper').numberRatioInText;

exports.getParagraph = function(
  folderPath,
  desiredMinTextLength,
  desiredMaxTextLength,
  mainCallback
) {
  let randomizedFilePathArr = getFileNamesArr(folderPath)
    .map(fileName => {
      return path.join(folderPath, fileName);
    })
    .sort(function() {
      return 0.5 - Math.random();
    });

  // delete. following line was just to test
  // randomizedFilePathArr = [path.join(folderPath, '163 Human Rights.txt')];

  let startTime = new Date();
  let invocationCounter = 0;

  // is doubleChecking is set to 1 if all files in the array searching completed once, and while doubleChecking=1, startingPoint in the file to be read has been set to 0, no randomization of starting point to ensure whole file is read and no match found.
  let isDoubleChecking = 0;

  const minTextLength = parseInt(desiredMinTextLength || 20, 10);
  const maxTextLength = parseInt(desiredMaxTextLength || minTextLength, 10);

  // Invoking generateParagraph once, then rest will be
  // called by callbackOfGenerateParagraph,
  // inside the callbackOfGenerateParagraph main callBack is called
  generateParagraph(
    randomizedFilePathArr[invocationCounter],
    minTextLength,
    maxTextLength,
    callbackOfGenerateParagraph,
    isDoubleChecking
  );

  function callbackOfGenerateParagraph(paragraph) {
    invocationCounter++;
    if (invocationCounter >= randomizedFilePathArr.length) {
      invocationCounter = 0;
      isDoubleChecking++;
    }

    if (isDoubleChecking > 1 && paragraph.length < minTextLength) {
      mainCallback(
        `sorry! Data could not be found in ${(new Date() - startTime) / 1000}s!`
      );
    } else if (paragraph.length < minTextLength) {
      // console.log('going to call ' + (invocationCounter + 1) + 'th file');
      generateParagraph(
        randomizedFilePathArr[invocationCounter],
        minTextLength,
        maxTextLength,
        callbackOfGenerateParagraph,
        isDoubleChecking
      );
    } else {
      mainCallback(paragraph);
      // mainCallback(
      //   `Hurray! Data found in ${(new Date() - startTime) /
      //     1000}s in entire database!`
      // );
    }
  }

  function generateParagraph(
    chosenFilePath,
    minTextLength,
    maxTextLength,
    callbackOfGenerateParagraph,
    isDoubleChecking
  ) {
    const totalTextLength = getTextLengthOfFile(chosenFilePath);

    const chunkSizeInByte = 1024;
    const readStream = fs.createReadStream(chosenFilePath, {
      encoding: 'utf8',
      highWaterMark: chunkSizeInByte
    });

    const startingPoint = chance.integer({
      min: 0,
      max: isDoubleChecking
        ? 0
        : // 2 why? let set a earlier starting point, so that chanceJS doesn't include the last lines of the paragraph
          totalTextLength - minTextLength * 2 > 0
          ? totalTextLength - minTextLength * 2
          : 0
    });

    const chosenTextLength = chance.integer({
      min: minTextLength,
      max: isDoubleChecking ? minTextLength : maxTextLength
    });

    let paragraph = '';
    let paragraphFound = false;
    let currentCharIndex = 0;
    let reachedStartingPoint = false;
    let appropriateStartingCharFound = false;
    let loop = 0;

    readStream.on('data', function(result) {
      const data = result.toString();

      loop++;
      if (reachedStartingPoint || loop * 1024 > startingPoint) {
        for (let i = 0; i < data.length; i++) {
          let currentCharIndex = (loop - 1) * chunkSizeInByte + i;

          if (reachedStartingPoint || currentCharIndex > startingPoint) {
            let char = data[i];
            reachedStartingPoint = true;

            if (!appropriateStartingCharFound && /. [A-Z]/g.test('. ' + char)) {
              appropriateStartingCharFound = true;
            }

            if (!paragraphFound && appropriateStartingCharFound) {
              // keep extracting paragraph
              // if (!/[^A-Za-z0-9 .%_\-\/]|(  )/g.test(char)) {
              if (!/[^A-Za-z0-9 .,'";%_\-\/‘’“”\(\)\?]|(  )/g.test(char)) {
                paragraph += char;

                if (
                  paragraph.length > chosenTextLength &&
                  numberRatioInText(paragraph) > 0.05
                ) {
                  // resetting search related variables in this charIndex
                  paragraph = '';
                  appropriateStartingCharFound = false;
                }
              } else {
                paragraph = '';
                appropriateStartingCharFound = false;
              }
            }

            // stop reading if paragraph has been found and ends with period.
            if (
              paragraph.length > chosenTextLength &&
              char + data[i + 1] === '. ' &&
              !paragraphFound
            ) {
              readStream.destroy();
              callbackOfGenerateParagraph(paragraph);

              if (isDoubleChecking > 0) {
                console.log('found on double check');
              }

              paragraphFound = true;
            }
          }
        }
      }
    });

    // The following 'end' will not run if readStream.destroy() already has run.
    readStream.on('end', function() {
      callbackOfGenerateParagraph(paragraph);
    });
  }
};

// getParagraph(folderPath, 20, 30, paragraph => {
//   console.log('...');
//   console.log(paragraph);
// });

// getParagraph(
//   randomizedFilePathArr[invocationCounter],
//   minTextLength,
//   maxTextLength,
//   callbackOfGetParagraph,
//   isDoubleChecking
// );
