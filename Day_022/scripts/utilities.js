// helper functions

const getElementRect = (element) => {
  if (!element.classList.contains("hidden")) {
    return element.getBoundingClientRect();
  }
  element.classList.remove("hidden");
  const rect = element.getBoundingClientRect();
  element.classList.add("hidden");
  return rect;
};
