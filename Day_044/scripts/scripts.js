import { status, getlabels, emptyLabels, updateHeader, allNotes, replaceScaleNotes, allNotesFromOffset } from "./dataStructure.js";
import { addClickEvents } from "./eventListeners.js";
import { createArmNode } from "./createElements.js";
import { addContextClickEvents } from "./eventListeners.js";
import { rotateNoteEvent, rotateBubbles } from "./rotations.js";
import { composeScale } from "./algorithms.js";

const elements = {
  majorMinorSlider: document.querySelector(".switch input"),
  majorKeyToggle: document.querySelector("#majorKey"),
  minorKeyToggle: document.querySelector("#minorKey"),
};

const radius = 200;
const centre = document.querySelector("#centre");
// const majRoman = [ "I", "V", "ii", "vi", "iii", "vii", "", "", "", "", "", "IV"];
// const allIntervals = ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "Tritone/Flat 5th", "Minor 2nd", "Minor 6th", "Minor 3rd", "Minor 7th", "Perfect 4th"];
// const majIntervals = ["Tonic", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "", "", "", "", "", "Perfect 4th"];
// const minIntervals = [ "Minor 3rd", "Minor 7th", "Perfect 4th", "Tonic", "Perfect 5th", "Major 2nd", "", "", "", "", "", "Minor 6th", ];
// const minIntervals = [ "Tonic", "Perfect 5th", "Major 2nd", "", "", "", "", "", "Minor 6th", "Minor 3rd", "Minor 7th", "Perfect 4th"];

// const chordShapes2 = {
//   MajTriad: [0, 1, 4],
//   MajTetrad: [0, 1, 4, 5]
// }

// add major/minor slider event listener
const addSliderEvents = () => {
  elements.majorMinorSlider.addEventListener("change", (event) => {
    toggleMajorMinor();
  });
};

const clearBubbles = (className) => {
  const bubbles = document.querySelectorAll(`.${className}.bubble`);
  bubbles.forEach((bubble) => {
    bubble.textContent = "";
  });
};

const showStatus = () => {
  console.log(status);
}

document.querySelector(".rotateLabelTest").addEventListener("click", () => {
  const amount = Number(document.querySelector("#input-offset").value);
  rotateBubbles(amount, `.label.bubble`);
  // rotateLabel(amount);
});

document.querySelector(".rotateNoteTest").addEventListener("click", () => {
  const amount = Number(document.querySelector("#input-offset").value);
  rotateBubbles(amount, `.note.bubble`);
  // rotateNote(amount);
});

addSliderEvents();

status.setTotalNodes(allNotes);

createArmNode(centre, "note", allNotes);
addClickEvents("note", rotateNoteEvent);
createArmNode(centre, "label", getlabels());
createArmNode(centre, "chordLabel", emptyLabels);

addContextClickEvents();
updateHeader();

const homeBubble = document.querySelector(`.note.bubble[data-position="0"]`);

// const scaleType = 'major'
// const startNote = "D";
// const scalePositions = allNotesFromOffset(startNote);
// const updatedPositions = replaceScaleNotes(startNote, scaleType, scalePositions);

// drawChordLines(svgContainer, 'MajTetrad');
