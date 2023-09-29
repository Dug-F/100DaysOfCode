const totalPoints = 12;
const container = document.querySelector('#container')
const radius = 200;
const centre = document.querySelector("#centre");

class Note {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  createNote(container) {
  let arm = document.createElement("div");
  arm.id = `${this.name}-arm`;
  arm.className = "arm";
  arm.dataset.position = this.position;
  arm.style.rotate = `${this.position * 30 - 90}deg`;
  centre.appendChild(arm);

  let note = document.createElement("div");
  note.id = `${this.name}-note`;
  note.className = "note";
  note.dataset.position = this.position;
  note.textContent = this.name;
  note.style.rotate = `${-(this.position * 30 - 90)}deg`;
  arm.appendChild(note);

  return note;
  }
}

["C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭",  "A♯/B♭", "F"].forEach((noteName, positionIndex) => {
  // const position = new CircularPosition(positionIndex, totalPoints, radius);
  const noteElem = new Note(noteName, positionIndex);
  const note = noteElem.createNote(container);
  note.addEventListener("click", () => {
    rotateNote(event.target);
  }); 
})

const rotateNote = (note) => {
  const selectedPosition = note.dataset.position;
  let rotationDirection = "_ccw";
  if (selectedPosition > 6) {
    rotationDirection = "_cw";
  }
  document.querySelectorAll('.arm').forEach((arm) => {
    const note = arm.firstElementChild;
    let rotationDegrees = (gsap.getProperty(arm, "rotation") - selectedPosition * 30) % 360;
        let newPosition = arm.dataset.position - selectedPosition;
    if (newPosition < 0) {
      newPosition += 12;
    }
    arm.dataset.position = newPosition;
    note.dataset.position = newPosition;
    gsap.to(arm, { rotation: `${rotationDegrees}${rotationDirection}`, duration: 2 })
    gsap.to(note, { rotation: `${-rotationDegrees}_short`, duration: 2 });
  }) 
}

