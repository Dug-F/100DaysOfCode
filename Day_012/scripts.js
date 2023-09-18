const totalPoints = 12;
const container = document.querySelector('#container')
const radius = 200;
const centre = document.querySelector("#centre");
const allNotes = [ "C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F", ];
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

const rotateNote = (note) => {
  respondToClicks = false;
  const selectedPosition = parseInt(note.dataset.position);
  const rotationDirection = selectedPosition > 6 ? "_cw" : "_ccw";
  const counterRotationDirection = rotationDirection === "_cw" ? "_ccw" : "_cw";
  document.querySelectorAll('.arm').forEach((arm) => {
    const note = arm.firstElementChild;
    let rotationDegrees = (gsap.getProperty(arm, "rotation") - selectedPosition * 30) % 360;
    let currentPosition = parseInt(arm.dataset.position);
    if (currentPosition < selectedPosition) {
      currentPosition += 12;
    }
    arm.dataset.position = currentPosition - selectedPosition;
    note.dataset.position = arm.dataset.position;

    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2 })
    gsap.to(note, { rotation: `${-rotationDegrees}${counterRotationDirection}`, duration: 2, onComplete: () => {respondToClicks = true;} });
  }) 
}

createBubble(centre, "note", allNotes);
addClickEvents("note", rotateNote);

