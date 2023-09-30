//****************
//* context menu *
//****************

// positions and shows the context menu
const showContextMenu = (event) => {
  contextMenu.style.top = `${event.clientY - container.getBoundingClientRect().top - 10}px`;
  contextMenu.style.left = `${event.x + 10}px`;
  contextMenu.classList.remove("hidden");
}

// removes descendant line item elements
const removeLineItems = (event, parent) => {
  parent.querySelectorAll("li").forEach((element) => {
    element.remove();
  });
}

// handles initial right click and builds context menu
const handleContextClick = (event) => {
  event.preventDefault();
  showContextMenu(event);

  // remove any existing line items - this also discards their event listeners
  removeLineItems(event, contextMenu);

  // add new line items
  // to add a new line item:
  // 1. add a createContextMenuItem line
  // 2. create an entry in the contextCallbacks constant to define which callback to invoke
  // 3. create the callback function referred to in 2
  // 4. if the line item is for a sub-menu, add it to the submenus array constant

  const parent = contextMenu.querySelector("ul");
  createContextMenuItem("Make tonic", parent, event);
  createContextMenuItem("Intervals", parent, event, ">");
  createContextMenuItem("Chords", parent, event, "", ">");

};

//*******************
//* context submenu *
//*******************

// hide the context submenu
const hideContextSubmenu = () => {
  contextSubmenu.classList.add("hidden");
  circleStatus.contextSubmenuVisible = false;
};

// show the context submenu
const showContextSubmenu = () => {
  contextSubmenu.classList.remove("hidden");
  circleStatus.contextSubmenuVisible = true;
};

// set the position of the context submenu
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
};

//**************
//* menu items *
//**************

// builds the individual components of a menu line item
const createContextMenuComponent = (parent, className, textContent = "") => {
  const component = document.createElement("span");
  component.classList.add(className);
  component.textContent = textContent;
  parent.appendChild(component);
};

// builds a new context menu or submenu line item
const createContextMenuItem = (itemText, parent, event, shortcut = "", suffix = "") => {
  // create menu item li container
  const item = document.createElement("li");

  createContextMenuComponent(item, "context-text", itemText);
  createContextMenuComponent(item, "context-shortcut", shortcut);
  createContextMenuComponent(item, "context-suffix", suffix);

  if (contextCallbacks[itemText]) {
    item.addEventListener("click", contextCallbacks[itemText]);
  }

  item.setAttribute("data-position", event.target.dataset.position);
  parent.appendChild(item);

  // return line item
  return item;
};

//**********************
//* callback functions *
//**********************
//
// the callback functions are set in the contextCallbacks constant

// make the selected bubble the new position 0 for the scale
const callbackMakeTonic = (event) => {
  const position = event.target.parentElement.dataset.position;
  const clickedElement = document.querySelector(`.note.bubble[data-position="${position}"]`);
  updatePositionNumber(container, ".arm, .bubble", -Number(position));
  populateBubbles("label2", circleStatus.currentScale);
  document.querySelectorAll(".note.bubble").forEach((element) => fadeElement(element));
};

  // builds the chords sub-menu line item
  const callbackChords = (event) => {
    event.preventDefault();

    removeLineItems(event, contextSubmenu);

    if (circleStatus.contextSubmenuVisible) {
      return;
    }

    const menuItem = createContextMenuItem("majorChords");
    menuItem.setAttribute("data-position", event.target.dataset.position);
    contextSubmenu.querySelector("ul").appendChild(menuItem);

    setContextSubmenuPosition(event);
};

// builds the intervals sub-menu line item
const callbackIntervals = (event) => {
  event.preventDefault();

  removeLineItems(event, contextSubmenu);

  if (circleStatus.contextSubmenuVisible) {
    return;
  }

  const parent = contextSubmenu.querySelector("ul");
  for (let key in innerLabels.major) {
    // const menuItem = createContextMenuItem(key, parent, event);
    const menuItem = createContextMenuItem(key, parent, event);
  }

  setContextSubmenuPosition(event);
};



