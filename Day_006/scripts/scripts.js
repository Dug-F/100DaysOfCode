// import * as noiseFunctions from './noiseFunctions.js';
// import * as petClasses from './petClasses.js';

let createdPets = {};

const pets = {
  "Generic Pet": makeNoiseGeneric,
  "Dog": makeNoiseDog,
  "Big Dog": makeNoiseBigDog,
  "Annoying Dog": makeNoiseAnnoyingDog,
  "Cat": makeNoiseCat,
  "Kitten": makeNoiseKitten,
  "Annoying Cat": makeNoiseAnnoyingCat,
};

const resetNewPet = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#species").value = "";
};

const resetPetSelectors = () => {
  document.querySelectorAll('[name="petType"]').forEach((radio) => {
    radio.checked = false;
  });
};

const getDropdownKey = (dropdownElement) => {
  const selectedOption = dropdownElement.options[dropdownElement.selectedIndex];
  return selectedOption.value;
}

const getPagePetName = () => {
  return document.querySelector("#name").value;
}

const getPageSpecies = () => {
  return document.querySelector("#species").value;
};

const buildSelects = () => {
  const dropdowns = [document.querySelector("#createSelection"), document.querySelector("#createActionSelection")];
  for (const key of Object.keys(pets)) {
    dropdowns.forEach((dropdown) => {
      // element create is in the loop as the 2 dropdowns need to have different elements appended
      const optionElement = document.createElement("option");
      optionElement.value = key;
      optionElement.text = key;
      dropdown.appendChild(optionElement);
    })
  }
};

buildSelects();
eventListeners();  
