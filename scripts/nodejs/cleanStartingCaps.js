const fs = require('fs');
const path = require('path');
const getFileNamesArr = require('./helper').getFileNamesArr;
const capsRatio = require('./helper').capsRatio;

let fileNameArr = getFileNamesArr(
  path.join(
    __dirname,
    '..',
    '..',
    'text_finalized',
    'US_archive',
    'US_archive_cleanedup_required'
  )
);

fileNameArr.forEach(filename => {
  const readFilePath = path.join(
    __dirname,
    '..',
    '..',
    'text_finalized',
    'US_archive',
    'US_archive_cleanedup_required',
    filename
  );

  const writeFilePath = path.join(
    __dirname,
    '..',
    '..',
    'text_finalized',
    'US_archive',
    'US_archive_cleanedup2',
    filename
  );

  const readStream = fs.createReadStream(readFilePath, {
    encoding: 'utf8',
    highWaterMark: 2147463646 / fileNameArr.length
  });

  readStream.on('data', function(result) {
    let finalData = result
      .replace(/((?<=\w)-[\n ]*)|—|–/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\. \. \./g, '...')
      // Next line is gotten from last line. Don't merge last and next line.
      .replace(/ \.\.\./g, '...')
      .replace(/([^A-Za-z0-9]\.\.\.)|(\.\.\. \.)/g, '...')
      .replace(/(\s\s+)|\t|(\r\n|\r|\n)/g, ' ')
      .replace(/‘|’/g, "'")
      .replace(/“|”/g, '"');

    let sweetStartingPos = 0;
    let posFound = false;
    let chunkToDel = '';

    for (let i = 0; i < finalData.length; i++) {
      chunkToDel += finalData[i];

      if (
        !posFound &&
        chunkToDel.length > 2000 &&
        capsRatio(chunkToDel.slice(-1990)) < 0.05
      ) {
        sweetStartingPos = i - 2000;
        posFound = true;
      }
    }

    finalData = finalData.slice(sweetStartingPos);

    fs.writeFile(writeFilePath, finalData, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });
  });
});
