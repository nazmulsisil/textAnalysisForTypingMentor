const path = require('path');
const getWordsContainSyllable = require('./getWordsContainSyllable')
  .getWordsContainSyllable;

// getWordsContainSyllable(
//   path.join(
//     __dirname,
//     '..',
//     '..',
//     'JSON',
//     'words',
//     'words_with_0_letters.json'
//   ),
//   40,
//   data => {
//     console.log(
//       data
//         .map(el => {
//           return Object.keys(el)[0];
//         })
//         .join('|')
//     );
//   },
//   'yuiophjklnm,"',
//   false,
//   0.7
// );

const notifier = require('node-notifier');
// String
notifier.notify('Hi Sisil, triSyllables.json was saved!');

// // Object
// notifier.notify({
//   title: 'Notification of nodejs process',
//   message: 'File was saved!'
// });
