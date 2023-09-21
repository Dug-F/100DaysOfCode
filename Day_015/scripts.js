const container = document.querySelector('#container')
const radius = 200;
const centre = document.querySelector("#centre");
const allNotes = [ "C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"];
const majRoman = [ "I", "V", "ii", "vi", "iii", "vii", "", "", "", "", "", "IV"];
const allIntervals = ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "Tritone/Flat 5th", "Minor 2nd", "Minor 6th", "Minor 3rd", "Minor 7th", "Perfect 4th"];
const majIntervals = ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "", "", "", "", "", "Perfect 4th"];
let respondToClicks = true;
let offset = 3
const baseOffset = -3;     // initially locates C to the top of the circle

chordShapes = {
  MajTriad: [0, 1, 4],
  MajTetrad: [0, 1, 4, 5]
}

// create an arm element
const createArm = (parent, className, bubbleName, position, totalNodes) => {
  // parent (element) is container element
  // className (string) is the mid component of the id and className
  // bubbleName (string) is the prefix for the className - represents the name of the bubble that will be attached
  // position (number) is the numeric position in the wheel (0 is at the base position)
  // totalNodes (number) is the total number of bubble nodes in the circle
  const arm = document.createElement("div");
  arm.id = `${bubbleName}-${className}-arm`;
  arm.className = `${className}-arm arm`;
  arm.dataset.position = position;
  arm.style.rotate = `${position * 30 + ((baseOffset + offset) * 360 / totalNodes)}deg`;
  parent.appendChild(arm);
  return arm;
}

// create a connector element
const createConnector = (arm, className, bubbleName, position) => {
  // arm (element) is container arm element
  // className (string) is the mid component of the id and className
  // bubbleName (string) is the prefix for the className - represents the name of the bubble that will be attached
  // position (number) is the numeric position in the wheel (0 is at the base position)
  const connector = document.createElement("div");
  connector.id = `${bubbleName}-${className}-connector`;
  connector.className = `${className}-connector-${position} connector`;
  arm.appendChild(connector);
  return connector;
}

// create a bubble element
const createBubble = (arm, className, bubbleName, position, totalNodes) => {
  // arm (element) is container arm element
  // className (string) is the mid component of the id and className
  // bubbleName (string) is the prefix for the className - represents the name of the bubble that will be attached
  // position (number) is the numeric position in the wheel (0 is at the base position)
  // totalNodes (number) is the total number of bubble nodes in the circle
  const bubble = document.createElement("div");
  bubble.id = `${bubbleName}-${className}`;
  bubble.className = `${className} bubble`;
  bubble.dataset.position = position;
  bubble.textContent = bubbleName;
  bubble.style.rotate = `${-( position * 30 + ((baseOffset + offset) * 360) / totalNodes )}deg`;
  arm.appendChild(bubble);
  return bubble;
}

// create an arm node structure comprising arm, connector and bubble
const createArmNode = (parent, className, contentsArray) => {
  // parent (element) is container element
  // className (string) is the mid component of the id and className
  // contextsArray (array[string]) is an array of strings for which to create bubbles
  contentsArray.forEach((bubbleName, position) => {
    const arm = createArm(parent, className, bubbleName, position, contentsArray.length);
    createConnector(arm, className, bubbleName, position);
    createBubble(arm, className, bubbleName, position, contentsArray.length);
  });
}

// adds click events to elements with the passed classname
const addClickEvents = (className, callbackFunc) => {
  // className (string) specifies the CSS selector for the elements to have a click eventListener attached
  // callbackFunc (function) is the function to call when the element is clicked
  document.querySelectorAll(`.${className}`).forEach((elem) => {
    elem.addEventListener("click", () => {
      if (respondToClicks) {
        callbackFunc(elem)
      }
    })
  })
}

// rotates the clicked on bubble to the base position.
// Rotates the entire circle structure of arms, connectors and bubbles that match the type of the clicked on bubble
const rotateBubble = (clickedElem) => {
  respondToClicks = false;
  const selectedPosition = parseInt(clickedElem.dataset.position);
  const rotationDirection = selectedPosition > 6 ? "_cw" : "_ccw";
  const counterRotationDirection = rotationDirection === "_cw" ? "_ccw" : "_cw";
  document.querySelectorAll(`.${clickedElem.className.replace(" ", ".")}`).forEach((bubble) => {
    const arm = bubble.parentElement;
    let rotationDegrees = (gsap.getProperty(arm, "rotation") - selectedPosition * 30) % 360;
    let currentPosition = parseInt(arm.dataset.position);
    if (currentPosition < selectedPosition) {
      currentPosition += 12;
    }
    arm.dataset.position = currentPosition - selectedPosition;
    bubble.dataset.position = arm.dataset.position;

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2, });
    gsap.to(bubble, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2, onComplete: () => { respondToClicks = true; },
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

// draw chord shapes
function drawChordLines(container, type) {
  // container (element) is the svg container element
  // type (string) is a key to the chordShapes object to define which nodes to join
  chordShapes[type].forEach((startPosition, index) => {
    const endPosition = index < chordShapes[type].length - 1 ? chordShapes[type][index + 1] : chordShapes[type][0];
    drawLine(container, startPosition, endPosition)
  })

}

createArmNode(centre, "note", allNotes);
addClickEvents("note", rotateBubble);
createArmNode(centre, "label2", majIntervals);

const svgContainer = document.querySelector("svg");
drawChordLines(svgContainer, 'MajTetrad');

