const intervalPositions = {
  unison: 0,
  1: 0,
  P5: 1,
  5: 1,
  2: 2,
  M2: 2,
  6: 3,
  M6: 3,
  3: 4,
  M3: 4,
  7: 5,
  M7: 5,
  '♭5': 6,
  aug4: 6,
  4: 11,
  P4: 11,
  m7: 10,
  m3: 9,
  m6: 8,
  m2: 7,
};

const keys = {
  major: {
    C: ["C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"],
    G: ["G", "D", "A", "E", "B", "F♯", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F", "C"],
  },
};

const labels = {
  Intervals: {
    Major: {
      "Major 3rd": ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "", "", "", "", "", "Perfect 4th"],
      M3: ["1", "5", "2", "6", "3", "7", "", "", "", "", "", "4"],
      V: ["I", "V", "II", "VI", "III", "VII", "", "", "", "", "", "IV"],
    },
  },
  Chords: {
    Major: {
      iii: ["I", "V", "ii", "vi", "iii", "vii°", "", "", "", "", "", "IV"],
    },
  },
};

const chordPatternsInScale = {
  triads: {
    Major: ["Major", "Major", "Minor", "Minor", "Minor", "Dim", "", "", "", "", "", "Major"],
  },
};

const chordShapes = {
  triads: {
    Major: ["1", "3", "5"],
    Minor: ["1", "m3", "5"],
    Dim: ["1", "m3", "♭5"],
  },
  tetrads: {
    Major: [[0, 1, 4, 5]],
  },
};

const defaultLabels = {
  Intervals: {
    Major: "Major 3rd",
  },
  Chords: {
    Major: "iii",
  },
};

const getCurrentLabels = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  const currentLabels = circleStatus.currentLabels;
  return labels[currentLabelType][currentScale][currentLabels];
};

const getCurrentScales = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  return labels[currentLabelType][currentScale];
};

const getCurrentLabelTypes = () => {
  const currentLabelType = circleStatus.currentLabelType;
  return labels;
};

const getDefaultLabels = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  return defaultLabels[currentLabelType][currentScale];
};

const intervalToPosition = (interval) => {
  return intervalPositions[interval];
}