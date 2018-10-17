exports.getSyllables = function(charsStr, numOfSyllables) {
  if (numOfSyllables === 0) return [];
  if (numOfSyllables > 3) throw 'Greater than 2 syllables are not supported!';

  var charArr = charsStr.split('');
  var doublesArr = [];
  var treblesArr = [];

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

  if (numOfSyllables === 3) {
    doublesArr.forEach(double => {
      charArr.forEach(single => {
        if (!double.includes(single)) {
          treblesArr.push(double + single);
        }
      });
    });

    return treblesArr;
  }
};
