// called when context menu item clicked
const handleContextClick = (event) => {
  event.preventDefault();
  contextMenu.style.top = `${ event.clientY - container.getBoundingClientRect().top - 10 }px`;
  contextMenu.style.left = `${event.x + 10}px`;
  contextMenu.classList.remove("hidden");

  contextMenu.querySelectorAll("li").forEach((element) => {
    element.remove();
  });

  const item = document.createElement("li");
  item.textContent = "Make tonic";
  item.setAttribute("data-position", event.target.dataset.position);
  const menuItem = contextMenu.querySelector("ul").appendChild(item);
  menuItem.addEventListener("click", handleContextMenuItem);
};

const handleContextMenuItem = (event) => {
  const clickedElement = document.querySelector( `.note.bubble[data-position="${event.target.dataset.position}"]`);
  console.log(event.target.textContent);
  switch (event.target.textContent) {
    case "Make tonic":
        updatePositionNumber(container, ".arm, .bubble", -Number(event.target.dataset.position));
        populateBubbles("label2", circleStatus.currentScale);
        document.querySelectorAll('.note.bubble').forEach((element) => fadeElement(element));
  }
//   rotateBubble(clickedElement);
};
