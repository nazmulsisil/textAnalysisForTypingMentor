const fs = require('fs');
const path = require('path');
const chance = new (require('chance'))();
const getTextLengthOfFile = require('./getTextLengthOfFile')
  .getTextLengthOfFile;
const getFileNamesArr = require('./helper').getFileNamesArr;

exports.getParagraph = function(
  folderPath,
  desiredMinTextLength,
  desiredMaxTextLength,
  mainCallback
) {
  const randomizedFilePathArr = getFileNamesArr(folderPath)
    .map(fileName => {
      return path.join(folderPath, fileName);
    })
    .sort(function() {
      return 0.5 - Math.random();
    });

  let invocationCounter = 0;
  let isDoubleChecking = 0; // all files array search completed once

  const minTextLength = desiredMinTextLength || 20;
  const maxTextLength = desiredMaxTextLength || minTextLength;

  // Invoking generateParagraph once, then rest will be
  // called by callbackOfGenerateParagraph,
  // inside the callbackOfGenerateParagraph main callBack is called
  generateParagraph(
    randomizedFilePathArr[invocationCounter],
    desiredMinTextLength,
    desiredMaxTextLength,
    callbackOfGenerateParagraph,
    isDoubleChecking
  );

  function callbackOfGenerateParagraph(paragraph) {
    invocationCounter++;
    if (invocationCounter >= randomizedFilePathArr.length) {
      invocationCounter = 0;
      isDoubleChecking++;
    }

    if (isDoubleChecking > 1) {
      mainCallback('sorry! Data could not be found in entire database!');
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

    const startingPoint = chance.natural({
      min: 0,
      max: isDoubleChecking
        ? 0
        : // 2 why? let set a earlier starting point, so that chanceJS doesn't include the last lines of the paragraph
          totalTextLength - minTextLength * 2 > 0
          ? totalTextLength - minTextLength * 2
          : 0
    });
    const chosenTextLength = chance.natural({
      min: minTextLength,
      max: maxTextLength
    });
    let paragraph = '';
    let paragraphFound = false;
    let currentCharIndex = 0;
    let reachedStartingPoint = false;
    let appropriateStartingCharFound = false;
    let uppercasePercentage = 0;
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
              if (!/[^A-Za-z0-9 .%_\-\/]|(  )/g.test(char)) {
                paragraph += char;
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
              callbackOfGenerateParagraph(paragraph);
              paragraphFound = true;
              readStream.destroy();
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
