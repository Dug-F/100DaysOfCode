const createContextMenuComponent = (parent, className, textContent = "") => {
  const component = document.createElement('span');
  component.classList.add(className);
  component.textContent = textContent;
  parent.appendChild(component);
}

const hideContextSubmenu = () => {
  contextSubmenu.classList.add("hidden");
  circleStatus.contextSubmenuVisible = false;
}

const showContextSubmenu = () => {
  contextSubmenu.classList.remove("hidden");
  circleStatus.contextSubmenuVisible = true;
};

// called when context menu item clicked
const createContextMenuItem = (itemText, shortcut = "", suffix = "") => {
  // create menu item li container
  const item = document.createElement("li");

  createContextMenuComponent(item, "context-text", itemText);
  createContextMenuComponent(item, 'context-shortcut', shortcut);
  createContextMenuComponent(item, "context-suffix", suffix);

  if (contextCallbacks[itemText]) {
    item.addEventListener("click", contextCallbacks[itemText]);
  }
  
  // return line item
  return item;

}

const callbackMakeTonic = (event) => {
  const position = event.target.parentElement.dataset.position;
  const clickedElement = document.querySelector( `.note.bubble[data-position="${position}"]`);
  updatePositionNumber( container, ".arm, .bubble", -Number(position));
  populateBubbles("label2", circleStatus.currentScale);
  document .querySelectorAll(".note.bubble") .forEach(
    (element) => fadeElement(element)
  );
}

const getElementRect = (element) => {
  if (!element.classList.contains('hidden')) {
    return element.getBoundingClientRect();
  }
  element.classList.remove('hidden');
  const rect = element.getBoundingClientRect();
  element.classList.add('hidden');
  return rect;
}

const setContextSubmenuPosition = (event) => {
  const submenuRect = getElementRect(contextSubmenu);
  const menuRect = contextMenu.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  if (containerRect.x + containerRect.width < menuRect.x + menuRect.width + submenuRect.width) {
    contextSubmenu.style.left = `${menuRect.x - menuRect.width - 20}px`;
  } else {
    contextSubmenu.style.left = `${menuRect.x + menuRect.width + 5}px`;
  }

  const clickedRect = event.target.parentElement.getBoundingClientRect();
  contextSubmenu.style.top = `${clickedRect.y + 10}px`;
}

const callbackChords = (event) => {
  event.preventDefault();

  contextSubmenu.querySelectorAll("li").forEach((element) => {
    element.remove();
  });

  if (circleStatus.contextSubmenuVisible) {
    return;
  }

  const menuItem = createContextMenuItem("majorChords");
  menuItem.setAttribute("data-position", event.target.dataset.position);
  contextSubmenu.querySelector('ul').appendChild(menuItem);

  setContextSubmenuPosition(event);
}


const handleContextClick = (event) => {
  event.preventDefault();
  contextMenu.style.top = `${ event.clientY - container.getBoundingClientRect().top - 10 }px`;
  contextMenu.style.left = `${event.x + 10}px`;
  contextMenu.classList.remove("hidden");

  contextMenu.querySelectorAll("li").forEach((element) => {
    element.remove();
  });

  let menuItem = createContextMenuItem("Make tonic");
  menuItem.setAttribute("data-position", event.target.dataset.position);
  contextMenu.querySelector("ul").appendChild(menuItem);

  menuItem = createContextMenuItem("Chords", "", ">");
  menuItem.setAttribute("data-position", event.target.dataset.position);
  contextMenu.querySelector("ul").appendChild(menuItem);

};

// const handleContextMenuItem = (event) => {
//   const clickedElement = document.querySelector( `.note.bubble[data-position="${event.target.dataset.position}"]`);
//   switch (event.target.textContent) {
//     case "Make tonic":
//         updatePositionNumber(container, ".arm, .bubble", -Number(event.target.dataset.position));
//         populateBubbles("label2", circleStatus.currentScale);
//         document.querySelectorAll('.note.bubble').forEach((element) => fadeElement(element));
//   }
// //   rotateBubble(clickedElement);
// };
