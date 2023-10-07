export const container = document.querySelector("#container");
export const svgContainer = document.querySelector("svg");
export const header = document.querySelector("#header");

export const circleStatus = {
  baseOffset: -3, // initially locates C to the top of the circle
  notesOffset: 0,
  totalNodes: 0,
  nodesAngle: 0,
  respondToClicks: true,
  contextSubmenuVisible: false,
  currentScale: "Major",
  currentLabelType: "Intervals",
  currentLabels: "Major 3rd",
  currentChordShapeType: "No chord",
  currentChordShape: "",
  currentChordRootPosition: 0,
  currentKey: "C",

  setTotalNodes(notesArray) {
    this.totalNodes = notesArray.length;
    this.nodesAngle = 360 / this.totalNodes;
  },

  getTotalOffsetAngle() {
    return (this.baseOffset + this.notesOffset) * this.nodesAngle;
  },

  getPositionAngle(position) {
    return position * this.nodesAngle + this.getTotalOffsetAngle();
  },
};

const intervalPositions = {
  1: 0,
  unison: 0,
  5: 1,
  2: 2,
  M2: 2,
  6: 3,
  M6: 3,
  3: 4,
  M3: 4,
  7: 5,
  M7: 5,
  "♭5": 6,
  "♯4": 6,
  tritone: 6,
  4: 11,
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

export const emptyLabels = ["", "", "", "", "", "", "", "", "", "", "", ""];

const labels = {
  Intervals: {
    Major: {
      "Major 3rd": ["Root", "Perfect\n5th", "Major\n2nd", "Major\n6th", "Major\n3rd", "Major\n7th", "", "", "", "", "", "Perfect\n4th"],
      M3: ["1", "5", "2", "6", "3", "7", "", "", "", "", "", "4"],
      V: ["I", "V", "II", "VI", "III", "VII", "", "", "", "", "", "IV"],
    },
  },
  Chords: {
    Major: {
      iii: ["I", "V", "ii", "vi", "iii", "vii°", "", "", "", "", "", "IV"],
      min7: ["I\nmaj7", "V\n7", "ii\nmin7", "vi\nmin7", "iii\nmin7", "vii°\nmin7♭5", "", "", "", "", "", "IV\nmaj7"],
    },
  },
};

export const chordPatternsInScale = {
  triads: {
    Major: ["maj", "maj", "min", "min", "min", "dim", "", "", "", "", "", "min"],
  },
  tetrads: {
    Major: ["maj7", "7", "min7", "min7", "min7", "m7♭5", "", "", "", "", "", "maj7"],
  },
};

export const chordShapes = {
  triads: {
    maj: ["1", "3", "5"],
    min: ["1", "m3", "5"],
    dim: ["1", "m3", "♭5"],
  },
  tetrads: {
    "maj7": ["1", "5", "3", "7"],
    "min7": ["1", "5", "m3", "m7"],
    "7": ["1", "5", "3", "m7"],
    "m7♭5": ["1", "♭5", "m3", "m7"],
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

export const updateHeader = () => {
  let headerText = `Key: ${circleStatus.currentKey} ${circleStatus.currentScale}`
  if (circleStatus.currentChordShapeType !== "No chord") {
    const chordRootConnector = getConnector('chordLabel', circleStatus.currentChordRootPosition);
    const chordRoot = getBubble('note', chordRootConnector.dataset.position);
    headerText += ` Chord: ${chordRoot.innerText}${circleStatus.currentChordShape}`
  }
  header.textContent = `${headerText}`;
};

export const getBubble = (className, position) => {
  return document.querySelector(`.${className}.bubble[data-position='${position}']`);
};

export const getConnector = (className, position) => {
  return document.querySelector(`.${className}-connector[data-position='${position}']`);
};

export const getCurrentLabels = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  const currentLabels = circleStatus.currentLabels;
  return labels[currentLabelType][currentScale][currentLabels];
};

export const getCurrentScales = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  return labels[currentLabelType][currentScale];
};

export const getCurrentLabelTypes = () => {
  const currentLabelType = circleStatus.currentLabelType;
  return labels;
};

export const getDefaultLabels = () => {
  const currentLabelType = circleStatus.currentLabelType;
  const currentScale = circleStatus.currentScale;
  return defaultLabels[currentLabelType][currentScale];
};

export const intervalToPosition = (interval) => {
  return intervalPositions[interval];
};

export const getCurrentChordShapeTypes = () => {
  return chordShapes;
};

export const getDefaultChordType = () => {
  return "triads";
};
