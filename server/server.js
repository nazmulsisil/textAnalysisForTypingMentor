const path = require('path');
const express = require('express');
const app = express();

const getMostFrequentSyllables = require('./../scripts/nodejs/mostFrequent')
  .getMostFrequentSyllables;
const getParagraph = require('./../scripts/nodejs/getParagraph').getParagraph;

const indexHTMLPath = path.join(__dirname, '..');
app.use(express.static(indexHTMLPath));

// get words
app.get('/getWords', (req, res) => {
  const wordLength = parseInt(req.query.wordLength || 5, 10);
  const howMany = parseInt(req.query.howMany || 5, 10);

  if (wordLength > 49 || wordLength < 0) {
    res.send('Word length mush be between 0 and 49');
    return;
  }
  if (howMany < 0) {
    res.send('Number of words can not be negative.');
    return;
  }

  getMostFrequentSyllables(
    path.join(
      __dirname,
      '..',
      'JSON',
      'words',
      `words_with_${wordLength - 1}_letters.json`
    ),
    howMany,
    dataOnCompletions => {
      res.send(dataOnCompletions);
    }
  );
});

app.get('/getParagraph', (req, res) => {
  const paraMinLength = parseInt(req.query.paraMinLength || 200, 10);
  const paraMaxLength = parseInt(req.query.paraMaxLength || 300, 10);

  if (paraMinLength > 15000 || paraMinLength < 0) {
    res.send('Paragraph length mush be between 0 and 15000');
    return;
  }

  if (paraMaxLength < paraMinLength) {
    res.send(paraMinLength + ' : ' + paraMaxLength);
    return;
  }

  const folderPath = path.join(__dirname, '..', 'text_lab');
  getParagraph(folderPath, paraMinLength, paraMaxLength, para => {
    res.send(para);
  });
});

app.listen(4444, () => {
  console.log('server is up!');
});
