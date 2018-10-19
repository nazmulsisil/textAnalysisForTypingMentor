const fs = require('fs');
const path = require('path');
const chance = new (require('chance'))();
const getTextLengthOfFile = require('./getTextLengthOfFile')
  .getTextLengthOfFile;
const getFileNamesArr = require('./helper').getFileNamesArr;

const folderPath = path.join(__dirname, '..', '..', 'text_lab');
const randomizedFilePathArr = getFileNamesArr(folderPath)
  .map(fileName => {
    return path.join(folderPath, fileName);
  })
  .sort(function() {
    return 0.5 - Math.random();
  });

let invocationCounter = 0;

const minTextLength = 200;
const maxTextLength = 300;
const callbackOfGetParagraph = paragraph => {
  invocationCounter++;
  console.log('going to call ' + (invocationCounter + 1) + ' times');
  if (invocationCounter >= randomizedFilePathArr.length) {
    console.log('sorry! Data could not be found in entire database!');
  } else if (paragraph.length < minTextLength) {
    getParagraph(
      randomizedFilePathArr[invocationCounter],
      minTextLength,
      maxTextLength,
      callbackOfGetParagraph
    );
  } else {
    console.log(paragraph);
  }
};

function getParagraph(chosenFilePath, minTextLength, maxTextLength, callback) {
  const totalTextLength = getTextLengthOfFile(chosenFilePath);

  const chunkSizeInByte = 1024;
  const readStream = fs.createReadStream(chosenFilePath, {
    encoding: 'utf8',
    highWaterMark: chunkSizeInByte
  });

  const startingPoint = chance.natural({ min: 0, max: totalTextLength });
  const chosenTextLength = chance.natural({
    min: minTextLength,
    max: maxTextLength
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
            if (!/[^A-Za-z0-9 .%_\-\/]/g.test(char)) {
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
            callback(paragraph);
            paragraphFound = true;
            readStream.destroy();
          }
        }
      }
    }
  });

  readStream.on('end', function() {
    callback(paragraph);
  });
}

getParagraph(
  randomizedFilePathArr[invocationCounter],
  minTextLength,
  maxTextLength,
  callbackOfGetParagraph
);
