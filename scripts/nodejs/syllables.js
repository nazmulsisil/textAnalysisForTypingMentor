exports.getSyllables = function(charsStr, numOfSyllables) {
  if (numOfSyllables === 0) return [];
  if (numOfSyllables === 1) return charsStr.split('');
  if (numOfSyllables > 4) throw 'Greater than 2 syllables are not supported!';

  var charArr = charsStr.split('');
  var doublesArr = [];
  var treblesArr = [];
  var quad = [];

  if (numOfSyllables >= 2) {
    charArr.forEach(single => {
      charArr.forEach(single2 => {
        if (single !== single2) {
          doublesArr.push(single + single2);
        }
      });
    });
  }

  if (numOfSyllables === 2) {
    return doublesArr;
  }

  if (numOfSyllables >= 3) {
    doublesArr.forEach(double => {
      charArr.forEach(single => {
        if (!double.includes(single)) {
          treblesArr.push(double + single);
        }
      });
    });
  }

  if (numOfSyllables === 3) {
    return treblesArr;
  }

  if (numOfSyllables >= 4) {
    treblesArr.forEach(treble => {
      charArr.forEach(single => {
        if (!treble.includes(single)) {
          quad.push(treble + single);
        }
      });
    });
  }

  if (numOfSyllables === 4) {
    return quad;
  }
};
