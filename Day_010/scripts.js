const totalPoints = 12;
const container = document.querySelector('#container')
const radius = 200;

class CircularPosition {
  constructor(positionIndex, totalPoints, radius) {
    this.totalPoints = totalPoints;
    this.radius = radius;
    this.updatePosition(positionIndex);
  }

  updatePosition(positionIndex) {
    this.positionIndex = positionIndex;
    const angle = -(2 * Math.PI * positionIndex) / this.totalPoints + Math.PI / 2;
    this.x = this.radius * Math.cos(angle);
    this.y = this.radius * Math.sin(angle);
  }

  updateRadius(radius) {
    this.radius = radius;
  }
}

class Note {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  createNote(container) {
    let elem = document.createElement("div");
    elem.className = "note";
    elem.textContent = this.name;
    container.appendChild(elem);
    const heightOffset = container.offsetHeight / 2;
    const widthOffset = container.offsetWidth / 2;
    const elemHeightOffset = elem.offsetHeight / 2;
    const elemWidthOffset = elem.offsetWidth / 2;
    elem.style.left = `${widthOffset + this.position.x - 25}px`;
    elem.style.top = `${heightOffset - this.position.y - 25}px`;
    return elem;
  }
}

["C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭",  "A♯/B♭", "F"].forEach((noteName, positionIndex) => {
  const position = new CircularPosition(positionIndex, totalPoints, radius);
  const note = new Note(noteName, position);
  note.createNote(container);
})

