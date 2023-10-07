import { circleStatus, getCurrentLabels, emptyLabels, updateHeader } from "./dataStructure.js";
import { addClickEvents } from "./eventListeners.js";
import { createArmNode } from "./createElements.js";
import { addContextClickEvents } from "./eventListeners.js";
import { rotateNote } from "./rotations.js";

const elements = {
    majorMinorSlider: document.querySelector(".switch input"),
    majorKeyToggle: document.querySelector("#majorKey"),
    minorKeyToggle: document.querySelector('#minorKey')
}


const radius = 200;
const centre = document.querySelector("#centre");
const allNotes = [ "C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"];
const majRoman = [ "I", "V", "ii", "vi", "iii", "vii", "", "", "", "", "", "IV"];
const allIntervals = ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "Tritone/Flat 5th", "Minor 2nd", "Minor 6th", "Minor 3rd", "Minor 7th", "Perfect 4th"];
const majIntervals = ["Tonic", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "", "", "", "", "", "Perfect 4th"];
// const minIntervals = [ "Minor 3rd", "Minor 7th", "Perfect 4th", "Tonic", "Perfect 5th", "Major 2nd", "", "", "", "", "", "Minor 6th", ];
const minIntervals = [ "Tonic", "Perfect 5th", "Major 2nd", "", "", "", "", "", "Minor 6th", "Minor 3rd", "Minor 7th", "Perfect 4th"];

const chordShapes2 = {
  MajTriad: [0, 1, 4],
  MajTetrad: [0, 1, 4, 5]
}

// add major/minor slider event listener
const addSliderEvents = () => {
  elements.majorMinorSlider.addEventListener('change', (event) => {
    toggleMajorMinor();
  })
}

const clearBubbles = (className) => {
  const bubbles = document.querySelectorAll(`.${className}.bubble`);
  bubbles.forEach((bubble) => {
    bubble.textContent = "";
  })
}



addSliderEvents();

circleStatus.setTotalNodes(allNotes);

createArmNode(centre, "note", allNotes);
addClickEvents("note", rotateNote);
createArmNode(centre, "label", getCurrentLabels());
createArmNode(centre, "chordLabel", emptyLabels);

addContextClickEvents();
updateHeader();

// drawChordLines(svgContainer, 'MajTetrad');

