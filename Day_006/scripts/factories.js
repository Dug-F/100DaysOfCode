class PetFactory {
  constructor(pets) {
    this.pets = pets;
  }
  createPet(petKey, name, species = "") {
    if (Dog.validPets.includes(petKey)) {
      return new Dog(name, this.pets[petKey]);
    } else if (Cat.validPets.includes(petKey)) {
      return new Cat(name, this.pets[petKey]);
    } else {
      return new GenericPet(name, species, this.pets[petKey]);
    }
  }
}
