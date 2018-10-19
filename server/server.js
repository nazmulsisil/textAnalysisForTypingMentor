const path = require('path');
const express = require('express');
const app = express();
const indexHTMLPath = path.join(__dirname, '..');

const getMostFrequentSyllables = require('./../scripts/nodejs/mostFrequent')
  .getMostFrequentSyllables;

app.use(express.static(indexHTMLPath));

// get words
app.get('/getWords', (req, res) => {
  const wordLength = req.query.wordLength || 5;
  const howMany = req.query.howMany || 5;

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
      `words_with_${wordLength}_letters.json`
    ),
    howMany,
    dataOnCompletions => {
      res.send(dataOnCompletions);
    }
  );
});

app.get('/getParagraph', (req, res) => {});

app.listen(4444, () => {
  console.log('server is up!');
});
