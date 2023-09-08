let genericPet = null;
let dog = null;
let cat = null;
let selectedPet = null;

class Pet {
    constructor (name, species) {
        this._name = name;
        this._species = species;
    }

    get name() {
        return this._name || "An unloved, anonymous pet";
    }

    get species() {
      return this._species.toLowerCase() || "hard to discern species";
    }

    makeNoise() {
        return `${this.name}, a ${this.species}, is making a generic animal noise - probably a bit like a grunt`;
    }

}

class Cat extends Pet {
  constructor (name) {
    super(name);
  }

  makeNoise() {
    return `${this.name}, a cat, is meowing`;
  }

  purr() {
    return `${this.name}, a cat, is purring away nicely in your lap`;
  }
}

class Dog extends Pet {
  constructor(name) {
    super(name, species);
  }

  makeNoise() {
    return `${this.name}, a dog, is barking`;
  }

  fetch() {
    return `${this.name} returned a stick and is still not bored`;
  }
}


const createPet = (petType) => {
  pet = new Pet(petType)
};

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
    genericPet = new Pet(document.querySelector('#name').value, document.querySelector('#species').value);
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
