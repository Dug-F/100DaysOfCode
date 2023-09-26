// create an arm element
const createArm = (parent, className, bubbleName, position, totalNodes) => {
  // parent (element) is container element
  // className (string) is the mid component of the id and className
  // bubbleName (string) is the prefix for the className - represents the name of the bubble that will be attached
  // position (number) is the numeric position in the wheel (0 is at the base position)
  // totalNodes (number) is the total number of bubble nodes in the circle
  const arm = document.createElement("div");
  arm.id = `${bubbleName}-${className}-arm`;
  arm.className = `${className}-arm arm`;
  arm.dataset.position = position;
  // arm.style.rotate = `${position * 30 + ((baseOffset + offset) * 360 / totalNodes)}deg`;
  arm.style.rotate = `${circleStatus.getPositionAngle(position)}deg`;
  parent.appendChild(arm);
  return arm;
};

// create a connector element
const createConnector = (arm, className, bubbleName, position) => {
  // arm (element) is container arm element
  // className (string) is the mid component of the id and className
  // bubbleName (string) is the prefix for the className - represents the name of the bubble that will be attached
  // position (number) is the numeric position in the wheel (0 is at the base position)
  const connector = document.createElement("div");
  connector.id = `${bubbleName}-${className}-connector`;
  connector.className = `${className}-connector-${position} connector`;
  arm.appendChild(connector);
  return connector;
};

// create a bubble element
const createBubble = (arm, className, bubbleName, position, totalNodes) => {
  // arm (element) is container arm element
  // className (string) is the mid component of the id and className
  // bubbleName (string) is the prefix for the className - represents the name of the bubble that will be attached
  // position (number) is the numeric position in the wheel (0 is at the base position)
  // totalNodes (number) is the total number of bubble nodes in the circle
  const bubble = document.createElement("div");
  bubble.id = `${bubbleName}-${className}`;
  bubble.className = `${className} bubble`;
  bubble.dataset.position = position;
  bubble.textContent = bubbleName;
  bubble.style.rotate = `${-circleStatus.getPositionAngle(position)}deg`;
  arm.appendChild(bubble);
  return bubble;
};

// create an arm node structure comprising arm, connector and bubble
const createArmNode = (parent, className, contentsArray) => {
  // parent (element) is container element
  // className (string) is the mid component of the id and className
  // contentsArray (array[string]) is an array of strings for which to create bubbles
  contentsArray.forEach((bubbleName, position) => {
    const arm = createArm( parent, className, bubbleName, position, contentsArray.length );
    createConnector(arm, className, bubbleName, position);
    const bubble = createBubble( arm, className, bubbleName, position, contentsArray.length );
    fadeElement(bubble);
  });
};
