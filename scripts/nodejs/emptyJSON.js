const fs = require('fs');

exports.emptyJSON = function(jsonPath) {
  fs.writeFile(jsonPath, JSON.stringify({}), function(err) {
    if (err) {
      return console.log(err);
    }
    // console.log('The file was saved!');
  });
  return 'sisil';
};
