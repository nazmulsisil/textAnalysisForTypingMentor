// matchLetterInWord = function(lettersToMatch, word, noSwap) {
exports.matchLetterInWord = function(lettersToMatch, word, noSwap) {
  if (noSwap) return !(word.indexOf(lettersToMatch) < 0);
  else {
    let found = 0;
    lettersToMatch.split('').forEach(letterToMatch => {
      word.split('').forEach(char => {
        if (char === letterToMatch) {
          found++;
        }
      });
    });

    return found / word.length;
  }
};
