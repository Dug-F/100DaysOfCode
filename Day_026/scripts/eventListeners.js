const addContextClickEvents = () => {
  document.querySelectorAll(".note.bubble").forEach((element) => {
    element.addEventListener("contextmenu", handleContextClick);
  });

  document.addEventListener("click", (event) => {
    const textContent = event.target.parentElement.querySelector('.context-text').textContent;
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
