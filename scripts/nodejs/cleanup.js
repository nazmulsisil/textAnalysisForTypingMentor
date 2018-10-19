const fs = require('fs');
const path = require('path');
const getFileNamesArr = require('./helper').getFileNamesArr;

const fileNameArr = getFileNamesArr(
  path.join(__dirname, '..', 'text_finalized', 'jj', 'torrent')
);

fileNameArr.forEach(filename => {
  const readFilePath = path.join(
    __dirname,
    '..',
    'text_finalized',
    'jj',
    'torrent',
    filename
  );

  const writeFilePath = path.join(
    __dirname,
    '..',
    'text_finalized',
    'jj',
    'torrent_cleanedUp',
    filename
  );

  const readStream = fs.createReadStream(readFilePath, {
    encoding: 'utf8',
    highWaterMark: 2147463646 / fileNameArr.length
  });

  readStream.on('data', function(result) {
    const finalData = result
      .replace(/((?<=\w)-[\n ]*)|—/g, '')
      .replace(/\n+/g, ' ')
      .replace(/(\s\s+)|\t|(\r\n|\r|\n)/g, ' ');

    fs.writeFile(writeFilePath, finalData, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });
  });
});
