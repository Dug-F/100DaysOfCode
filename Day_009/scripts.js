const totalPoints = 12;
const container = document.querySelector('#container')
const radius = 200;

const calculatePosition = (radius, pointIndex) => {
  const angle = (-(2 * Math.PI * pointIndex) / totalPoints) + Math.PI / 2;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  console.log(x, y);
  return { x, y };
};

["C", "G", "D", "A", "E", "B", "F#/G♭", "C#/D♭", "G#/A♭", "D♯/E♭",  "A#/B♭", "F"].forEach((note, pointIndex) => {
    const { x, y } = calculatePosition(radius, pointIndex);
    
    let elem = document.createElement("div");
    elem.className = "note";
    elem.style.left = `${container.offsetWidth / 2 + x - 25}px`;
    elem.style.top = `${container.offsetHeight / 2 - y - 25}px`;
    console.log(pointIndex, note, elem.style.left, elem.style.top);
    elem.textContent = note;
    container.appendChild(elem);
})