const container = document.querySelector('#container')
const svgContainer = document.querySelector("svg");

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

const circleStatus = {
    baseOffset: -3,            // initially locates C to the top of the circle
    notesOffset: 0,
    totalNodes: 0,
    nodesAngle: 0,
    respondToClicks: true,
    contextSubmenuVisible: false,
    currentScale: "Major",
    currentLabelType: "Intervals",
    currentLabels: "Major 3rd",
    currentChordShapeType: "triads",

    setTotalNodes(notesArray) {
      this.totalNodes = notesArray.length;
      this.nodesAngle = 360 / this.totalNodes;
    },

    getTotalOffsetAngle() {
      return (this.baseOffset + this.notesOffset) * this.nodesAngle;
    },

    getPositionAngle(position) {
      return position * this.nodesAngle + this.getTotalOffsetAngle();
    }

};

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

// updates the position number for all elements matching passed selector
// the position number is updated by the amount passed in offset
const updatePositionNumber = (parent, selector, offset) =>  {
  parent.querySelectorAll(selector).forEach((element) => {
    let newPosition = Number(element.dataset.position) + offset;
    element.dataset.position = newPosition < 0 ? newPosition + 12 : newPosition % 12;
  })
}

const clearBubbles = (className) => {
  const bubbles = document.querySelectorAll(`.${className}.bubble`);
  bubbles.forEach((bubble) => {
    bubble.textContent = "";
  })
}

const populateBubbles = (className, contentsArray) => {
  const bubbles = document.querySelectorAll(`.${className}.bubble`);
  bubbles.forEach((bubble) => {
    gsap.to(bubble, { opacity: 0, duration: 0.4,
      onComplete: () => {
        gsap.delayedCall(0.2, () => { bubble.textContent = contentsArray[parseInt(bubble.dataset.position)]});
        gsap.to(bubble, { opacity: 1, duration: 0.4, delay: 0.4 });
      },
    });
  });
}

function fadeElement(element) {
  element.classList.remove("fade");
  // if (element.dataset.position < 11 && element.dataset.position > 5) {
  if (!getCurrentLabels()[element.dataset.position]) {
    element.classList.add("fade");
  }
}

// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
const rotateNote = (clickedElem) => {
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
    // set the degree of rotation - the current position * 30 degrees
    let rotationDegrees = (gsap.getProperty(arm, "rotation") - selectedPosition * 30) % 360;
    let currentPosition = parseInt(arm.dataset.position);
    if (currentPosition < selectedPosition) {
      currentPosition += 12;
    }
    arm.dataset.position = currentPosition - selectedPosition;
    bubble.dataset.position = arm.dataset.position;
    fadeElement(bubble);

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2, });
    gsap.to(bubble, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2, onComplete: () => { circleStatus.respondToClicks = true; },
    });
  })
}

// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
const rotateLabel = (clickedElem) => {
  if (clickedElem.dataset.position === "0"){
    return;
  }
  // disable clicking on bubble while animation in progress
  circleStatus.respondToClicks = false;
  const selectedPosition = parseInt(clickedElem.dataset.position);
  console.log(selectedPosition);
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

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2, });
    gsap.to(bubble, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2, onComplete: () => { circleStatus.respondToClicks = true; },
    });
  })
}

// draws an svg line between 2 specified connectors
const drawLine = (svgContainer, position1, position2) => {
  // svgContainer (element) is the parent svg container
  // position1 (number) is the number of the start connector element to join - 0 is the root
  // position2 (number)) is the number of the end connector element to join

  const connector1 = document.querySelector(`.note-connector-${position1}`);
  const connector2 = document.querySelector(`.note-connector-${position2}`);

  const connector1Rect = connector1.getBoundingClientRect();
  const connector2Rect = connector2.getBoundingClientRect();
  const containerRect = svgContainer.getBoundingClientRect();

  // Calculate coordinates for the line
  const x1 = connector1Rect.left;//+ connector1Rect.width / 2;
  const y1 = connector1Rect.top + connector1Rect.height / 2 - containerRect.y;
  const x2 = connector2Rect.left;// + connector1Rect.width / 2;
  const y2 = connector2Rect.top + connector2Rect.height / 2 - containerRect.y;

  const line = createSVGLine(x1, y1, x2, y2); // Replace with your desired coordinates
  svgContainer.appendChild(line);
  return line;
};

// create an svgLine element
function createSVGLine(x1, y1, x2, y2) {
  // x1 (number) is the start point x coordinate
  // y1 (number) is the start point y coordinate
  // x2 (number) is the end point x coordinate
  // y2 (number) is the end point y coordinate
  const svgNS = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("class", "svgLine");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  return line;
}

// // draw chord shapes
// function drawChordLines(container, type) {
//   // container (element) is the svg container element
//   // type (string) is a key to the chordShapes object to define which nodes to join
//   chordShapes2[type].forEach((startPosition, index) => {
//     const endPosition = index < chordShapes2[type].length - 1 ? chordShapes2[type][index + 1] : chordShapes2[type][0];
//     drawLine(container, startPosition, endPosition)
//   })

// }

// draw chord shapes
function drawChordLines(container, pattern, startPosition=0) {
  // container (element) is the svg container element
  // pattern is an array to define which nodes to join
  if (!pattern) {
    return;
  }
  
  const offset = parseInt(startPosition);
  pattern.forEach((startPoint, index) => {
    const endPoint = index < pattern.length - 1 ? pattern[index + 1] : pattern[0];
    drawLine(container, (startPoint + offset) % 12, (endPoint + offset) % 12)
  })

}

// clear svg canvas
function clearCanvas(container) {
  [...container.children].forEach((child) => {
    child.remove();
  })
}

addSliderEvents();

circleStatus.setTotalNodes(allNotes);

createArmNode(centre, "note", allNotes);
addClickEvents("note", rotateNote);
createArmNode(centre, "label", getCurrentLabels());

addContextClickEvents();

// drawChordLines(svgContainer, 'MajTetrad');

