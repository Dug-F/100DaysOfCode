// adds click events to elements with the passed classname
const addClickEvents = (className, callbackFunc) => {
  // className (string) specifies the CSS selector for the elements to have a click eventListener attached
  // callbackFunc (function) is the function to call when the element is clicked
  document.querySelectorAll(`.${className}`).forEach((elem) => {
    elem.addEventListener("click", () => { if (circleStatus.respondToClicks) { callbackFunc(elem); }
    });
  });
};

const addContextClickEvents = () => {
  document.querySelectorAll(".note.bubble").forEach((element) => {
    element.addEventListener("contextmenu", handleContextClick);
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("bubble")) {
      return;
    }
    const textContent = event.target.parentElement.querySelector(".context-text")?.textContent;
    if (submenus.has(textContent)) {
      if (circleStatus.contextSubmenuVisible) {
        hideContextSubmenu();
      } else {
        showContextSubmenu();
      }
      contextMenu.classList.remove("hidden");
    } else {
      contextMenu.classList.add("hidden");
      hideContextSubmenu();
    }
  });
};
