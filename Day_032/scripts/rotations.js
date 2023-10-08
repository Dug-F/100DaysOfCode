import { circleStatus, getBubble, updateHeader, allNotesFromOffset, replaceScaleNotes } from "./dataStructure.js";
import { fadeElement, populateBubblesByPosition, populateBubblesNoAnimation } from "./helperFunctions.js";

// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
export const rotateLabel = (clickedElem) => {
  if (clickedElem.dataset.position === "0") {
    return;
  }
  // disable clicking on bubble while animation in progress
  circleStatus.respondToClicks = false;
  const selectedPosition = parseInt(clickedElem.dataset.position);
  // set rotation direction as clockwise if postion > 6, otherwise anti-clockwise
  const rotationDirection = selectedPosition > 6 ? "_ccw" : "_cw";
  const counterRotationDirection = rotationDirection === "_cw" ? "_ccw" : "_cw";
  // remove any existing fade from the bubble
  const clickedClassName = clickedElem.className.replace("fade", "").replace(" ", ".");

  // for each bubble matched by class
  document.querySelectorAll(`.${clickedClassName}`).forEach((bubble) => {
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
      onComplete: () => {
        circleStatus.respondToClicks = true;
      },
    });
  });
  const bubble = getBubble("note", 0);
  circleStatus.currentKey = bubble.innerText;
  updateHeader();
};

// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
export const rotateNote = (clickedElem) => {
  if (clickedElem.dataset.position === "0"){
    return;
  }
  // disable clicking on bubble while animation in progress
  circleStatus.respondToClicks = false;
  const selectedPosition = parseInt(clickedElem.dataset.position);
  // set rotation direction as clockwise if postion > 6, otherwise anti-clockwise
  const rotationDirection = selectedPosition > 6 ? "_cw" : "_ccw";
  const counterRotationDirection = rotationDirection === "_cw" ? "_ccw" : "_cw";
  // remove any existing fade from the bubble
  const clickedClassName = clickedElem.className.replace("fade", "").replace(" ", ".");
  
  // for each bubble matched by class
  document.querySelectorAll(`.${clickedClassName}`).forEach((bubble) => {
    // get the parent arm of the bubble
    const arm = bubble.parentElement;
    const connector = arm.querySelector('.connector');
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

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2, });
    gsap.to(connector, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2});
    gsap.to(bubble, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2, onComplete: () => { completeRotation(); },
    });
  })
  const bubble = getBubble("note", 0);
  circleStatus.currentKey = bubble.innerText;
  const scalePositions = allNotesFromOffset(circleStatus.currentKey);
  populateBubblesNoAnimation("note", scalePositions);

  updateHeader();
  
}

const completeRotation = () => {
  const scalePositions = allNotesFromOffset(circleStatus.currentKey);
  const updatedPositions = replaceScaleNotes(circleStatus.currentKey, 'major', scalePositions);
  populateBubblesByPosition("note", updatedPositions)
  circleStatus.respondToClicks = true;
}
