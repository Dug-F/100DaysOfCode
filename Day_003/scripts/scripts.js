let genericPet = null;
let dog = null;
let cat = null;
let selectedPet = null;

const makeNoiseGeneric = () => {
  return `is making a generic animal noise - probably a bit like a grunt`;
}

const makeNoiseMeow = () => {
  return "is meowing";
}

const makeNoiseBark = () => {
  return "is barking";
};

class Pet {
  constructor(
    name = "An unloved, anonymous pet",
    species = "hard to discern species",
    noiseFunction = makeNoiseGeneric
  ) {
    // Prevent Pet being directly instantiated, as it is conceptually an abstract class
    if (this.constructor === Pet) {
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
    if (this.constructor === Pet) {
      throw new Error("Method 'makeNoise' must be implemented by subclasses");
    }
    return `${this.name}, a ${this.species.toLowerCase()}, ${this.noiseFunction}`;
  }
}

class GenericPet extends Pet {
  constructor (name, species, noiseFunction=makeNoiseGeneric) {
    super(name, species, noiseFunction)
  }

}

class Cat extends Pet {
  constructor (name, noiseFunction=makeNoiseMeow) {
    super(name, "Cat", noiseFunction);
  }

  purr() {
    return `${this.name}, a cat, is purring away nicely in your lap`;
  }
}

class Dog extends Pet {
  constructor(name, noiseFunction=makeNoiseBark) {
    super(name, "Dog", noiseFunction);
  }

  fetch() {
    return `${this.name} returned a stick and is still not bored`;
  }
}


// const createPet = (petType) => {
//   pet = new Pet(petType)
// };

const resetNewPet = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#species").value = "";
}

const resetPetSelectors = () => {
  document.querySelectorAll('[name="petType"]').forEach((radio) => {
    radio.checked = false;
  })
}

const eventListeners = () => {
  document.querySelector("#createGeneric").addEventListener("click", () => {
    genericPet = new GenericPet(document.querySelector('#name').value, document.querySelector('#species').value);
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#createDog").addEventListener("click", () => {
    dog = new Dog(document.querySelector('#name').value);
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#createCat").addEventListener("click", () => {
    cat = new Cat(document.querySelector('#name').value);
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#selectGeneric").addEventListener("click", () => {
    selectedPet = null;
    if (genericPet) {
      selectedPet = genericPet;
    }
  });

  document.querySelector("#selectCat").addEventListener("click", () => {
    selectedPet = null;
    if (cat) {
      selectedPet = cat;
    }
  });

  document.querySelector("#selectDog").addEventListener("click", () => {
    selectedPet = null;
    if (dog) {
      selectedPet = dog;
    }
  });

  document.querySelector("#makeNoise").addEventListener("click", () => {
    let status = document.querySelector("#status");
    status.textContent = "";
    if (selectedPet) {
      document.querySelector('#status').textContent = selectedPet.makeNoise();
    }
  });

  document.querySelector("#purr").addEventListener("click", () => {
    let status = document.querySelector("#status");
    status.textContent = "";
    try {
      status.textContent = selectedPet.purr();
    } catch (error) {
      if (selectedPet) {
        status.textContent = `${selectedPet.name} is never contented enough to purr`
      }
    }
  });

  document.querySelector("#fetch").addEventListener("click", () => {
    let status = document.querySelector("#status");
    status.textContent = "";
    try {
      status.textContent = selectedPet.fetch();
    } catch (error) {
      if (selectedPet) {
        status.textContent = `${selectedPet.name} is not interested in fetching things - get it yourself`;
      }
    }
  });

};

eventListeners();
