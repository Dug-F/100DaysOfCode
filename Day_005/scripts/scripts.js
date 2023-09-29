let createdPets = {};

const makeNoiseGeneric = () => {
  return `is making a generic animal noise - probably a bit like a grunt`;
};

const makeNoiseCat = () => {
  return "is meowing";
};

const makeNoiseAnnoyingCat = () => {
  return "is annoyingly, repeatedly meowing";
};

const makeNoiseKitten = () => {
  return "is making a cute high pitched mew";
};

const makeNoiseDog = () => {
  return "is barking";
};

const makeNoiseAnnoyingDog = () => {
  return "is annoyingly yapping round your ankles and won't stop";
};

const makeNoiseBigDog = () => {
  return "is making a massive borfing noise";
};

pets = {
  "Generic Pet": makeNoiseGeneric,
  "Dog": makeNoiseDog,
  "Big Dog": makeNoiseBigDog,
  "Annoying Dog": makeNoiseAnnoyingDog,
  "Cat": makeNoiseCat,
  "Kitten": makeNoiseKitten,
  "Annoying Cat": makeNoiseAnnoyingCat,
};

// prefixed class name with _ to signify that it is an abstract class
class _Pet {
  constructor(
    name = "An unloved, anonymous pet",
    species = "hard to discern species",
    noiseFunction = makeNoiseGeneric
  ) {
    // Prevent Pet being directly instantiated, as it is conceptually an abstract class
    if (this.constructor === _Pet) {
      throw new Error(
        "Pet is an abstract class and cannot be instantiated directly"
      );
    }

    this._name = name;
    this._species = species;
    this._noiseFunction = noiseFunction;
  }

  get name() {
    return this._name;
  }

  get species() {
    return this._species;
  }

  get noiseFunction() {
    return this._noiseFunction();
  }

  makeNoise(noise) {
    return `${this.name}, a ${this.species.toLowerCase()}, ${
      this.noiseFunction
    }`;
  }
}

class GenericPet extends _Pet {
  constructor(name, species, noiseFunction = makeNoiseGeneric) {
    super(name, species, noiseFunction);
  }
}

class Cat extends _Pet {
  static validPets = ["Cat", "Kitten", "Annoying Cat"];
  constructor(name, noiseFunction = makeNoiseCat) {
    super(name, "Cat", noiseFunction);
  }

  purr() {
    return `${this.name}, a cat, is purring away nicely in your lap`;
  }
}

class Dog extends _Pet {
  static validPets = ["Dog", "Big Dog", "Annoying Dog"]
  constructor(name, noiseFunction = makeNoiseBark) {
    super(name, "Dog", noiseFunction);
  }

  fetch() {
    return `${this.name} returned a stick and is still not bored`;
  }
}

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

const createPet = () => {
    const selectedKey = getDropdownKey(document.getElementById("createSelection"));
    if (Dog.validPets.includes(selectedKey)) {
      createdPets[selectedKey] = new Dog(getPagePetName(), pets[selectedKey]);
    } else if (Cat.validPets.includes(selectedKey)) {
      createdPets[selectedKey] = new Cat(getPagePetName(), pets[selectedKey]);
    } else {
      createdPets[selectedKey] = new GenericPet( getPagePetName(), getPageSpecies(), pets[selectedKey] );
    }
    resetNewPet();
    resetPetSelectors();
}

const eventListeners = () => {
  document.querySelector("#createPet").addEventListener("click", () => {
    createPet();
  });

  document.querySelector("#makeNoise").addEventListener("click", () => {
    const selectedKey = getDropdownKey( document.getElementById("createActionSelection") );
    let status = document.querySelector("#status");
    status.textContent = "";
    if (selectedKey in createdPets) {
      document.querySelector("#status").textContent = createdPets[selectedKey].makeNoise();
    }
  });

  document.querySelector("#purr").addEventListener("click", () => {
    let status = document.querySelector("#status");
    status.textContent = "";
    const selectedKey = getDropdownKey( document.getElementById("createActionSelection") );
    try {
      if (selectedKey in createdPets) {
        document.querySelector("#status").textContent = createdPets[selectedKey].purr();
      }
    } catch (error) {
      if (selectedKey in createdPets) {
        status.textContent = `${createdPets[selectedKey].name} is never contented enough to purr`;
      }
    }
  });

  document.querySelector("#fetch").addEventListener("click", () => {
    let status = document.querySelector("#status");
    status.textContent = "";
    const selectedKey = getDropdownKey(
      document.getElementById("createActionSelection")
    );
    try {
      if (selectedKey in createdPets) {
        document.querySelector("#status").textContent =
          createdPets[selectedKey].fetch();
      }
    } catch (error) {
      if (selectedKey in createdPets) {
        status.textContent = `${createdPets[selectedKey].name} is not interested in fetching things - get it yourself`;
      }
    }
  });
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
