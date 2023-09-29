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
  static validPets = ["Dog", "Big Dog", "Annoying Dog"];
  constructor(name, noiseFunction = makeNoiseBark) {
    super(name, "Dog", noiseFunction);
  }

  fetch() {
    return `${this.name} returned a stick and is still not bored`;
  }
}
