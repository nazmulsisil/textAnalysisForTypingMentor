exports.textFilter = function(txt) {
  return (
    txt
      .replace(/—|–/g, '-')
      .replace(/\n+/g, '\n')
      // ensuring space after comma
      .replace(/,(?=[^ 0-9'"])/g, ', ')
      .replace(/(\s\s+)|\t|(\r\n|\r|\n)/g, ' ')
      // ensuring space after . if next letter is uppercase and not like U.S.A
      .replace(/\.(?=[A-Z][^.])/g, '. ')
      .replace(/‘|’/g, "'")
      .replace(/“|”/g, '"')
      .replace(/[^A-Za-z0-9~!@#$%\^&*()_+\-={}[\]:"|;'\\<>?,./` ]/g, ' ')
  );
};
