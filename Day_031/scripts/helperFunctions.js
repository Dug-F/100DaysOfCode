import {getCurrentLabels} from "./dataStructure.js";

export const fadeElement = (element) => {
  element.classList.remove("fade");
  // if (element.dataset.position < 11 && element.dataset.position > 5) {
  if (!getCurrentLabels()[element.dataset.position]) {
    element.classList.add("fade");
  }
}

// updates the position number for all elements matching passed selector
// the position number is updated by the amount passed in offset
export const updatePositionNumber = (parent, selector, offset) =>  {
  parent.querySelectorAll(selector).forEach((element) => {
    let newPosition = Number(element.dataset.position) + offset;
    element.dataset.position = newPosition < 0 ? newPosition + 12 : newPosition % 12;
  })
}

export function getElementCenter(element) {
  const rect = element.getBoundingClientRect();

  const width = rect.width;
  const height = rect.height;

  const centerX = rect.left + width / 2;
  const centerY = rect.top + height / 2;

  return { x: centerX, y: centerY };
}

export const populateBubbles = (className, contentsArray) => {
  const bubbles = document.querySelectorAll(`.${className}.bubble`);
  bubbles.forEach((bubble) => {
    gsap.to(bubble, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        gsap.delayedCall(0.2, () => {
          bubble.textContent = contentsArray[parseInt(bubble.dataset.position)];
        });
        gsap.to(bubble, { opacity: 1, duration: 0.4, delay: 0.4 });
      },
    });
  });
};
