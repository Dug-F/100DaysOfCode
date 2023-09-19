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

createBubble(centre, "note", allNotes);
addClickEvents("note", rotateBubble);
createBubble(centre, "label2", majIntervals);

