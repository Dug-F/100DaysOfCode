let genericPet = null;
let dog = null;
let cat = null;
let annoyingCat = null;
let kitten = null;
let bigDog = null;
let annoyingDog = null;
let selectedPet = null;

const makeNoiseGeneric = () => {
  return `is making a generic animal noise - probably a bit like a grunt`;
}

const makeNoiseCat = () => {
  return "is meowing";
}

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
    return `${this.name}, a ${this.species.toLowerCase()}, ${this.noiseFunction}`;
  }
}

class GenericPet extends _Pet {
  constructor (name, species, noiseFunction=makeNoiseGeneric) {
    super(name, species, noiseFunction)
  }

}

class Cat extends _Pet {
  constructor (name, noiseFunction=makeNoiseCat) {
    super(name, "Cat", noiseFunction);
  }

  purr() {
    return `${this.name}, a cat, is purring away nicely in your lap`;
  }
}

class Dog extends _Pet {
  constructor(name, noiseFunction=makeNoiseBark) {
    super(name, "Dog", noiseFunction);
  }

  fetch() {
    return `${this.name} returned a stick and is still not bored`;
  }
}

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

  document.querySelector("#createAnnoyingDog").addEventListener("click", () => {
    annoyingDog = new Dog(document.querySelector("#name").value, makeNoiseAnnoyingDog);
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#createAnnoyingDog").addEventListener("click", () => {
    bigDog = new Dog( document.querySelector("#name").value, makeNoiseBigDog );
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#createCat").addEventListener("click", () => {
    cat = new Cat(document.querySelector('#name').value);
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#createAnnoyingCat").addEventListener("click", () => {
    annoyingCat = new Cat(document.querySelector("#name").value, makeNoiseAnnoyingCat);
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#createKitten").addEventListener("click", () => {
    kitten = new Cat( document.querySelector("#name").value, makeNoiseKitten );
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

  document.querySelector("#selectAnnoyingCat").addEventListener("click", () => {
    selectedPet = null;
    if (annoyingCat) {
      selectedPet = annoyingCat;
    }
  });

  document.querySelector("#selectKitten").addEventListener("click", () => {
    selectedPet = null;
    if (kitten) {
      selectedPet = kitten;
    }
  });

  document.querySelector("#selectDog").addEventListener("click", () => {
    selectedPet = null;
    if (dog) {
      selectedPet = dog;
    }
  });

  document.querySelector("#selectAnnoyingDog").addEventListener("click", () => {
    selectedPet = null;
    if (annoyingDog) {
      selectedPet = annoyingDog;
    }
  });

  document.querySelector("#selectBigDog").addEventListener("click", () => {
    selectedPet = null;
    if (bigDog) {
      selectedPet = bigDog;
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
