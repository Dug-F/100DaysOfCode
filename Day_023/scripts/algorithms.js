export const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
export const chromaticScale = ["C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"];
export const flatsScale = ["C", "G", "D", "A", "E", "B", "G♭", "D♭", "A♭", "E♭", "B♭", "F"];
export const sharpsScale = ["C", "G", "D", "A", "E", "B", "F♯", "C♯", "G♯", "D♯", "A♯", "F"];

// converts a note potentially containing sharps and flats to a natural note
// input note is a string, containing a note letter and potentially sharps or flats
// returns a string containing the upper case natural note, or null if no note found
export const toNaturalNote = (note) => {
  for (let i = 0, l = note.length; i < l; i++) {
    const noteUpper = note[i].toUpperCase()
    if (naturalNotes.includes(noteUpper)) {
      return noteUpper;
    }
  }
  return null;
};

// gets the base interval from a passed interval, e.g. if the passed interval is m4, returns 4
// input note is a string, containing an interval which must contain a number, potentially with modifiers
// returns a number representing the base interval
export const getBaseInterval = (interval) => {
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
    const naturalNote = toNaturalNote(startNote);
    const baseInterval = getBaseInterval(interval);
    const naturalNoteIndex = naturalNotes.indexOf(naturalNote);
    const baseIntervalNoteIndex = (naturalNoteIndex + baseInterval - 1) % 7;
    const baseIntervalNote = naturalNotes[baseIntervalNoteIndex];

    console.log("naturalNote: ", naturalNote, " baseInterval: ", baseInterval, " naturalNoteIndex: ", naturalNoteIndex, 
    " baseIntervalNoteIndex: ", baseIntervalNoteIndex, " baseIntervalNote: ", baseIntervalNote);

    return baseIntervalNote;
}

