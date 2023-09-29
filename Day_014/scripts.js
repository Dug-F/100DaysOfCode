const totalPoints = 12;
const container = document.querySelector('#container')
const radius = 200;
const centre = document.querySelector("#centre");
const allNotes = [ "C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"];
const majRoman = [ "I", "V", "ii", "vi", "iii", "vii", "", "", "", "", "", "IV"];
const allIntervals = ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "Tritone/Flat 5th", "Minor 2nd", "Minor 6th", "Minor 3rd", "Minor 7th", "Perfect 4th"];
const majIntervals = ["Root", "Perfect 5th", "Major 2nd", "Major 6th", "Major 3rd", "Major 7th", "", "", "", "", "", "Perfect 4th"];
let respondToClicks = true;

const createBubble = (parent, className, contentsArray) => {
  contentsArray.forEach((bubbleName, position) => {
    const arm = document.createElement("div");
    arm.id = `${bubbleName}-${className}-arm`;
    arm.className = `${className}-arm arm`;
    arm.dataset.position = position;
    arm.style.rotate = `${position * 30 - 90}deg`;
    parent.appendChild(arm);

    const connector = document.createElement('div');
    connector.id = `${bubbleName}-${className}-connector`;
    connector.className = `${className}-connector connector`;
    arm.appendChild(connector);

    const bubble = document.createElement("div");
    bubble.id = `${bubbleName}-${className}`;
    bubble.className = `${className} bubble`;
    bubble.dataset.position = position;
    bubble.textContent = bubbleName;
    bubble.style.rotate = `${-(position * 30 - 90)}deg`;
    arm.appendChild(bubble);
  })
}

const addClickEvents = (className, callbackFunc) => {
  document.querySelectorAll(`.${className}`).forEach((elem) => {
    elem.addEventListener("click", () => {
      if (respondToClicks) {
        callbackFunc(elem)
      }
    })
  })
}

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

const drawLine = (svgContainer, connector1, connector2) => {
  // Get the C and A connector positions
  const connector1Rect = connector1.getBoundingClientRect();
  const connector2Rect = connector2.getBoundingClientRect();
  const containerRect = svgContainer.getBoundingClientRect();

  // Calculate coordinates for the line
  const x1 = connector1Rect.right;
  const y1 = connector1Rect.top + connector1Rect.height / 2 - containerRect.y;
  const x2 = connector2Rect.right;
  const y2 = connector2Rect.top + connector2Rect.height / 2 - containerRect.y;

  const line = createSVGLine(x1, y1, x2, y2); // Replace with your desired coordinates
  svgContainer.appendChild(line);

};

function createSVGLine(x1, y1, x2, y2) {
  const svgNS = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("class", "svgLine");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  return line;
}



createBubble(centre, "note", allNotes);
addClickEvents("note", rotateBubble);
createBubble(centre, "label2", majIntervals);
const svgContainer = document.querySelector("svg");
const cConnector = document.getElementById("C-note-connector");
const eConnector = document.getElementById("E-note-connector");
const gConnector = document.getElementById("G-note-connector");

drawLine(svgContainer, cConnector, eConnector);
drawLine(svgContainer, eConnector, gConnector);
drawLine(svgContainer, cConnector, gConnector);

