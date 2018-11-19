exports.textFilter = function(txt) {
  return (
    txt
      .replace(/—|–/g, '-')
      .replace(/\n+/g, '\n')
      // ensuring space after comma
      .replace(/,(?=[^ ])/g, ', ')
      .replace(/(\s\s+)|\t|(\r\n|\r|\n)/g, ' ')
      // ensuring space after . if next letter is uppercase
      .replace(/\.(?=[A-Z])/g, '. ')
      .replace(/‘|’/g, "'")
      .replace(/“|”/g, '"')
  );
};
