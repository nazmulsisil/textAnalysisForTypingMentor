const fs = require('fs');
const path = require('path');
const chance = new require('chance')();

const readPath = path.join(
  __dirname,
  './../../../text_consolidated/wordFrequencyOrg5k.txt'
);
const writePath = path.join(
  __dirname,
  './../../../JSON/all_words/wordFrequencyOrg5kArr.json'
);

const foundContent = fs.readFileSync(readPath, 'utf8');
const wordFrequencyOrg5kArr = foundContent.split('\r\n');

// Swapping some positions within the array
let counter = 0;
while (counter < 600) {
  let indexA = chance.integer({ min: 0, max: 4988 });
  let indexB = indexA + chance.integer({ min: 0, max: 13 });
  swapArrayElements(wordFrequencyOrg5kArr, indexA, indexB);
  counter++;
}

const noDuplicateArr = Array.from(new Set(wordFrequencyOrg5kArr));

// Slicing 3k words and saving in the write file.
fs.writeFile(writePath, JSON.stringify(noDuplicateArr), () => {
  console.log('completed, item found: ' + noDuplicateArr.length);
});

function swapArrayElements(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}
