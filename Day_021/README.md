# 100DaysOfCode

##### Today's objective

- Introduce 2nd level context menus
- Give context menu line items space for keyboard shortcut, status toggle and right arrow to indicate a sub-menu

```
Plan
// Change context menu line items to have <span> elements to separate the components (keyboard shortcut, status toggle, item text and right arrow)
// Give each component in the menu line it's own class so that they can be styled individually
// Give each span item a fixed width so that the menu items all line up
// Sub menus will have their own ul/li structure to define the sub-menu
// sub menu items also need to have their own event listeners.
  // event listeners are currently set on li elements within context-menu.  
  // Not sure if I will also need to add event listeners to the ul tags.  Probably not, since the ul will be within a li
  // however, don't want to include the first ul tag
// stretch target: create separate functions for each menu item rather than having them all direct to handle contextMenuItem
  // which functions to invoke for each menu item to be held in an object with the item text as a key and the function name as a value
```
