const addContextClickEvents = () => {
  document.querySelectorAll(".note.bubble").forEach((element) => {
    element.addEventListener("contextmenu", handleContextClick);
  });

  document.addEventListener("click", () => {
    contextMenu.classList.add("hidden");
  });
};
