import { status, getBubble, updateHeader, allNotesFromOffset, replaceScaleNotes, validTonics } from "./dataStructure.js";
import { fadeElement, populateBubblesByPosition, populateBubblesNoAnimation } from "./helperFunctions.js";
import { composeScale, scales } from "./algorithms.js";

const regexSharpsOrFlats = new RegExp(`[${"♯"}${"♭"}]`, 'g');

// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
export const rotateLabel = (clickedElem) => {
  if (clickedElem.dataset.position === "0") {
    return;
  }
  // disable clicking on bubble while animation in progress
  status.respondToClicks = false;
  const selectedPosition = parseInt(clickedElem.dataset.position);
  // set rotation direction as clockwise if postion > 6, otherwise anti-clockwise
  const rotationDirection = selectedPosition > 6 ? "_ccw" : "_cw";
  const counterRotationDirection = rotationDirection === "_cw" ? "_ccw" : "_cw";

  // for each label bubble
  document.querySelectorAll(`.label.bubble`).forEach((bubble) => {
    // get the parent arm of the bubble
    const arm = bubble.parentElement;
    // set the degree of rotation - the current position * 30 degrees
    let rotationDegrees = (gsap.getProperty(arm, "rotation") + selectedPosition * 30) % 360;
    let currentPosition = parseInt(arm.dataset.position);
    const note = document.querySelector(`.note.bubble[data-position="${currentPosition}"]`);
    fadeElement(note);

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2 });
    gsap.to(bubble, {
      rotation: `${-rotationDegrees}${counterRotationDirection}`,
      duration: 2,
      onComplete: completeRotation,
    });
  });
  const bubble = getBubble("note", 0);
  status.currentKey = bubble.innerText;

  status.chromaticScale = allNotesFromOffset(status.currentKey);
  populateBubblesNoAnimation("note", status.chromaticScale);

  updateHeader();
};

/**
 * @description accepts a compound start note (i.e. contains a '/') and returns an object containing the separate valid tonic start notes, their scales and a count of the accidentals in the scale
 * @param {string} startNote note to start at
 * @returns {{scale: {tonic: string, scales: Array}, count: number}}} return value
 */
export const getTonicScales = (startNote) => {
  const tonics = startNote.split("/");
  const tonicScales = {};
  for (let tonic of tonics) {
    if (!validTonics.has(tonic)) {
      continue;
    }
    const tonicScale = composeScale(tonic, scales["major"]);
    tonicScales[tonic] = { scale: tonicScale, count: countAccidentals(tonicScale) };
  }
  return tonicScales;
}


// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
export const rotateNote = (clickedElem) => {
  if (clickedElem.dataset.position === "0") {
    return;
  }
  // disable clicking on bubble while animation in progress
  status.respondToClicks = false;
  const selectedPosition = parseInt(clickedElem.dataset.position);
  let clickedNote = clickedElem.innerText;
  
  if (clickedNote.includes('/')) {
    const scales = getTonicScales(clickedNote);
    if (scales.length > 1) {
      status.respondToClicks = true;
      return;
    }
    clickedNote = Object.keys(scales)[0];
  }
  
  if (!validTonics.has(clickedNote)) {
    status.respondToClicks = true;
    return;
  }

  status.currentKey = clickedNote;
  status.chromaticScale = allNotesFromOffset(status.currentKey);



  // set rotation direction as clockwise if postion > 6, otherwise anti-clockwise
  const rotationDirection = selectedPosition > 6 ? "_cw" : "_ccw";
  const counterRotationDirection = rotationDirection === "_cw" ? "_ccw" : "_cw";

  // for each note bubble
  document.querySelectorAll(`.note.bubble`).forEach((bubble) => {
    // get the parent arm of the bubble
    const arm = bubble.parentElement;
    const connector = arm.querySelector(".connector");
    // set the degree of rotation - the current position * 30 degrees
    let rotationDegrees = (gsap.getProperty(arm, "rotation") - selectedPosition * 30) % 360;
    let currentPosition = parseInt(arm.dataset.position);
    if (currentPosition < selectedPosition) {
      currentPosition += 12;
    }
    arm.dataset.position = currentPosition - selectedPosition;
    bubble.dataset.position = arm.dataset.position;
    connector.dataset.position = arm.dataset.position;
    fadeElement(bubble);

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2 });
    gsap.to(connector, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2 });
    gsap.to(bubble, {
      rotation: `${-rotationDegrees}${counterRotationDirection}`,
      duration: 2,
      onComplete: () => {
        completeRotation();
      },
    });
  });
  const bubble = getBubble("note", 0);
  populateBubblesNoAnimation("note", status.chromaticScale);

  updateHeader();
};

const completeRotation = () => {
  const updatedPositions = replaceScaleNotes(status.currentKey, "major", status.chromaticScale);
  populateBubblesByPosition("note", updatedPositions);
  status.respondToClicks = true;
};

const countAccidentals = (scale) => {
  let scaleString = scale.join('');
  const matches =  scaleString.match(regexSharpsOrFlats);
  return matches ? matches.length : 0;
}
