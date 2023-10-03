const toggleMajorMinor = () => {
  if (elements.majorMinorSlider.checked) {
    toMinorKey();
  } else {
    toMajorKey();
  }
};

// Swapped to major key
const toMajorKey = () => {
  fadeSlider(minorKey);
  unfadeSlider(majorKey);
  updatePositionNumber(container, ".arm, .bubble", 3);
  circleStatus.currentScale = majIntervals;
  populateBubbles("label2", circleStatus.currentScale);
};

const toMinorKey = () => {
  fadeSlider(majorKey);
  unfadeSlider(minorKey);
  updatePositionNumber(container, ".arm, .bubble", -3);
  circleStatus.currentScale = naturalMinor;
  populateBubbles("innerLabel", circleStatus.currentScale);
};

const fadeSlider = (element) => {
  element.classList.add("fade");
  element.classList.remove("unfade");
};

const unfadeSlider = (element) => {
  element.classList.remove("fade");
  element.classList.add("unfade");
};
