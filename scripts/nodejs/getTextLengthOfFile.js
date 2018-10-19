const fs = require('fs');

exports.getTextLengthOfFile = function(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};
