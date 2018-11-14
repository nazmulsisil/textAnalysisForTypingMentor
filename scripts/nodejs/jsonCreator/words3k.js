const fs = require('fs');
const path = require('path');

const readPath = path.join(__dirname, './../../../text_finalized/words3k.txt');
const writePath = path.join(
  __dirname,
  './../../../JSON/all_words/words3k.json'
);

const start = new Date();

const dict = fs.readFileSync(
  path.join(__dirname, './../../../JSON/all_words/dictionary.json'),
  'utf8'
);
const dictionary = JSON.parse(dict).map(word => {
  return word.toLowerCase();
});

console.log('1. dictionary length: ' + dictionary.length);

fs.readFile(readPath, 'utf8', function(err, data) {
  console.log('2. words3k text length: ' + data.length);
  if (err) throw err;
  const wordArr = [];
  data.split('\r\n').forEach(currWord => {
    wordArr.push(currWord);
  });

  const additionalDataToPush = [
    '863 Mohco Way',
    '1876 Buja Court',
    '574 Itolep Road',
    '641 Jurge Highway',
    '1859 Dongok Park',
    '(627) 411-1016',
    '(336) 516-3742',
    '(611) 729-8765',
    '(722) 308-7281',
    '(869) 744-4320',
    '9e24e34f-c585-5408-9fdd-50c7b0eea91e',
    '354ebc90-7040-5717-9bea-26e06b401180',
    '956b5a4d-be91-5157-9f18-f6852bacec3c',
    '109804ca-88ae-5337-823c-1d4dbca78c32',
    'f8e328fd-bea0-54c3-8817-7f7feb4de1f7'
  ];

  wordArr.push(...additionalDataToPush);

  fs.writeFile(writePath, JSON.stringify(wordArr), function(err) {
    if (err) throw err;
    console.log('complete');
    console.log('words found: ' + wordArr.length);
  });
});
