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
      iii: ["I", "V", "ii", "vI", "iii", "vii°", "", "", "", "", "", "IV"],
    },
  },
};

const chordPatternsInScale = {
  triads: {
    Major: ["Major", "Major", "Minor", "Minor", "Minor", "Dim", "", "", "", "", "", "Major"]
  }
}

const chordShapes = {
  triads: {
    Major: [0, 1, 4],
    Minor: [0, 9, 1],
    Dim: [0, 9, 6]
  },
  tetrads: {
    Major: [[0, 1, 4, 5]]
  }
}

const defaultLabels = {
  Intervals: {
    Major: "Major 3rd"
  },
  Chords: {
    Major: "iii"
  }
}

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

}

const getCurrentLabelTypes = () => {
  const currentLabelType = circleStatus.currentLabelType;
  return labels;
};

const getDefaultLabels = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  return defaultLabels[currentLabelType][currentScale];
}
