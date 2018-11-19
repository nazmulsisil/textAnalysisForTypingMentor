const fs = require('fs');
const path = require('path');
const txv = {
  noSyllables: 'noSyllables',
  diSyllables: 'diSyllables',
  triSyllables: 'triSyllables',
  quadSyllables: 'quadSyllables',
  words100: 'words100'
};

// TODO: need to take problem words as well from client side
const clientProbKeys = [
  { d: 0.08421052631578947 },
  { h: 0.08421052631578947 },
  { a: 0.08421052631578947 },
  { k: 0.08421052631578947 },
  { a: 0.07368421052631578 },
  { o: 0.07368421052631578 },
  { f: 0.07368421052631578 },
  { b: 0.06315789473684211 },
  { a: 0.06315789473684211 },
  { n: 0.06315789473684211 },
  { g: 0.05263157894736842 },
  { l: 0.05263157894736842 },
  { a: 0.042105263157894736 },
  { d: 0.042105263157894736 },
  { e: 0.031578947368421054 },
  { s: 0.021052631578947368 },
  { h: 0.010526315789473684 }
];
const defaultLessonToProblemKeysRatio = [
  80,
  80,
  80,
  80,
  75,
  75,
  75,
  75,
  67,
  67,
  50,
  50
];
const defaultLessonPlanArr = [
  // 5 wpm
  {
    [txv.noSyllables]: 0
  },

  // 10 wpm
  {
    [txv.noSyllables]: 0
  },
  // 15 wpm
  {
    [txv.noSyllables]: 1
  },
  // 20 wpm
  {
    [txv.character]: 1,
    [txv.diSyllables]: 0
  },
  //25 wpm
  {
    [txv.noSyllables]: 2,
    [txv.diSyllables]: 0
  },

  // 30 wpm
  {
    [txv.noSyllables]: 2,
    [txv.triSyllables]: 1
  },

  // 35 wpm
  {
    [txv.triSyllables]: 1,
    [txv.words100]: 0 // top 25
  },

  // 40 wpm
  {
    [txv.quadSyllables]: 0,
    [txv.words100]: 0 // top 25
  },

  // 45 wpm
  {
    [txv.quadSyllables]: 1,
    [txv.words100]: 1 // top 50
  },

  // 50 wpm
  {
    [txv.words100]: 1 // top 50
  },

  // 55 wpm
  {
    [txv.words100]: 2 // top 100
  },

  // 60 wpm
  {
    [txv.words100]: 2 // top 100
  }
];
const getRatioOfDefaultLessonToProblemKeys = (
  recentWPM,
  defaultLessonToProblemKeysRatio
) => {
  if (recentWPM > 60) {
    return 0;
  }
  const arrayElementToTarget = Math.ceil(recentWPM / 5) - 1;
  return defaultLessonToProblemKeysRatio[arrayElementToTarget];
};
const recentWPM = 34;
console.log(
  getRatioOfDefaultLessonToProblemKeys(
    recentWPM,
    defaultLessonToProblemKeysRatio
  )
);
const getDefaultLesson = recentWPM => {
  if (recentWPM > 60) {
    throw new Error('There is no lesson from more than 60wpm');
  } else {
    const arrayElementToTarget = Math.ceil(recentWPM / 5) - 1;
    const selectedLessonPlan = defaultLessonPlanArr[arrayElementToTarget];

    const defaultPlanJSONPath = path.join(
      __dirname,
      './../../../JSON/consolidatedJSON/syllables_&_words/consolidatedSectionsArr.json'
    );
    const defaultPlanAll = JSON.parse(
      fs.readFileSync(defaultPlanJSONPath, 'utf8')
    );

    console.log(defaultPlanAll);

    const selectedLessonsKeysArr = [];
    for (const lessonName in selectedLessonPlan) {
      if (selectedLessonPlan.hasOwnProperty(lessonName)) {
        const ArrayIndexToTarget = selectedLessonPlan[lessonName];
        selectedLessonsKeysArr.push(
          defaultPlanAll['' + lessonName + ''][ArrayIndexToTarget]
        );
      }
    }

    return selectedLessonsKeysArr;
  }
};

console.log(getDefaultLesson(recentWPM));
