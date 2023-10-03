export const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
export const chromaticScale = ["C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"];
export const flatsScale = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
export const sharpsScale = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

const intervalDistances = {
  unison: 0,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  dim4: 4,
  P4: 5,
  aug4: 6,
  dim5: 6,
  P5: 7,
  aug5: 8,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  octave: 12,
};

const nonNumericIntervals = {
  unison: 1,
  octave: 8,
};

export const scales = {
  major: ["unison", "M2", "M3", "P4", "P5", "M6", "M7"],
  naturalMinor: ["unison", "M2", "m3", "P4", "P5", "m6", "m7"],
};

// append sharp accidentals to note
// export const appendSharps = (note, count) => {
//   for (let i = 0; i < count; i++) {
//     note += "♯";
//   }
//   return note;
// }

// append sharp accidentals to note
export const appendSharps = (scaleArray, targetNote, startIndex) => {
  // console.log("In append sharps, scaleArray: ", scaleArray, " targetNote: ", targetNote, " startIndex: ", startIndex);
  let note = targetNote;
  let i = startIndex;
  while (true) {
    // console.log("In appendFlats: targetNote: ", targetNote, " startIndex: ", startIndex, " note: ", note, " i: ", i);
    if (i < 0 || i >= scaleArray.length) {
      console.log("something has gone wrong in appendSharps");
      break;
    }
    if (scaleArray[i] === targetNote) {
      return note;
    }
    note += "♯";
    i--;
  }
};

// // append flat accidentals to note
// export const appendFlats = (note, count) => {
//   for (let i = 0; i < count; i++) {
//     note += "♭";
//   }
//   return note;
// };

// append flat accidentals to note
export const appendFlats = (scaleArray, targetNote, startIndex) => {
  // console.log("In append flats, scaleArray: ", scaleArray, " targetNote: ", targetNote, " startIndex: ", startIndex);
  let note = targetNote;
  let i = startIndex;
  while (true) {
    // console.log("In appendFlats: targetNote: ", targetNote, " startIndex: ", startIndex, " note: ", note, " i: ", i );
    if (i < 0 || i >= scaleArray.length) {
      console.log("something has gone wrong in appendFlats");
      break;
    }
    // console.log("scaleArray[i]: ", scaleArray[i], " taretNote: ", targetNote);
    if (scaleArray[i] === targetNote) {
      return note;
    }
    note += "♭";
    i++;
  }
};

// converts a note potentially containing sharps and flats to a natural note
// input note is a string, containing a note letter and potentially sharps or flats
// returns a string containing the upper case natural note, or null if no note found
export const toNaturalNote = (note) => {
  for (let i = 0, l = note.length; i < l; i++) {
    const noteUpper = note[i].toUpperCase();
    if (naturalNotes.includes(noteUpper)) {
      return noteUpper;
    }
  }
  return null;
};

// gets the base interval from a passed interval, e.g. if the passed interval is m4, returns 4
// input note is a string, containing an interval which must contain a number, potentially with modifiers
// or an entry in the nonNumericIntervals object
// returns a number representing the base interval
export const getBaseInterval = (interval) => {
  if (nonNumericIntervals.hasOwnProperty(interval)) {
    return nonNumericIntervals[interval];
  }
  for (let i = 0, l = interval.length; i < l; i++) {
    if (!isNaN(interval[i])) {
      return Number(interval[i]);
    }
  }
  return null;
};

// gets raw note offset given starting note and interval
// e.g. given C and m3 it will return E
export const getBaseIntervalNote = (startNote, interval) => {
  // if (intervalDistances[interval] % 12 === 0) {
  //   return startNote;
  // }
  // naturalNote is the passed note with any accidentals removed
  const naturalNote = toNaturalNote(startNote);
  // baseInterval is interval index offset for the passed interval
  const baseInterval = getBaseInterval(interval);
  // naturalNoteIndex = is the index of the natural note
  const naturalNoteIndex = naturalNotes.indexOf(naturalNote);
  // baseIntervalNoteIndex is the difference between the
  const baseIntervalNoteIndex = (naturalNoteIndex + baseInterval - 1) % 7;
  const baseIntervalNote = naturalNotes[baseIntervalNoteIndex];

  // console.log(
  //   "naturalNote: ",
  //   naturalNote,
  //   " baseInterval: ",
  //   baseInterval,
  //   " naturalNoteIndex: ",
  //   naturalNoteIndex,
  //   " baseIntervalNoteIndex: ",
  //   baseIntervalNoteIndex,
  //   " baseIntervalNote: ",
  //   baseIntervalNote
  // );

  return baseIntervalNote;
};

// returns a note given a starting note and an interval
// e.g. given G and M7 it will return F♯
// acceptable intervals are the values in the intervalDistances object
export const getIntervalNote = (startNote, interval) => {
  const chromaticScale = sharpsScale.includes(startNote) ? [...sharpsScale, ...sharpsScale] : [...flatsScale, ...flatsScale];

  // find the index of the start note in the chromatic scale
  const startNoteIndex = chromaticScale.indexOf(startNote);
  // find the number of interval steps (semitones) to be added according to the interval
  const intervalSteps = intervalDistances[interval];
  // calculate the index of the start note + interval steps
  const intervalIndex = startNoteIndex + intervalSteps;

  // get the note of the the target interval after all accidentals have been removed, i.e. find the basic degree of the scale
  const rawTargetNote = getBaseIntervalNote(startNote, interval);
  // find the index of the basic scale degree
  // const rawTargetNoteIndex = (chromaticScale.indexOf(rawTargetNote, startNoteIndex + 1));

  const startIndex = startNoteIndex + intervalSteps;

  // console.log(
  //   "\nchromaticScale: ", chromaticScale,
  //   " startNoteIndex: ", startNoteIndex,
  //   " intervalSteps: ", intervalSteps,
  //   " rawTargetNote: ", rawTargetNote,
  //   // " rawTargetNoteIndex: ", rawTargetNoteIndex,
  //   " intervalIndex: ", intervalIndex,
  //   " startIndex: ", startIndex, 
  //   " startNote: ", startNote, 
  //   " compareNote: ", chromaticScale[startNoteIndex + intervalSteps]
  // );

  const compareNote = chromaticScale[startNoteIndex + intervalSteps];
  if (rawTargetNote > compareNote || compareNote.includes("♭")) {
    return appendFlats(chromaticScale, rawTargetNote, startIndex);
  } else {
    return appendSharps(chromaticScale, rawTargetNote, startIndex);
  }

  if (rawTargetNoteIndex === intervalIndex) {
    return rawTargetNote;
  }
  if (rawTargetNoteIndex < intervalIndex) {
    return appendSharps(rawTargetNote, intervalIndex - rawTargetNoteIndex);
  }
  return appendFlats(rawTargetNote, rawTargetNoteIndex - intervalIndex);
};

// composes a scale based on a starting note and a passed scale type, which is a key to the scales object
// the scale interval array is an array containing valid intervals from the intervalDistances object
export const composeScale = (startNote, intervalArray) => {
  const scaleArray = [];
  intervalArray.forEach((interval) => {
    scaleArray.push(getIntervalNote(startNote, interval));
  });
  // console.log("\n", scaleArray);
  return scaleArray;
};
