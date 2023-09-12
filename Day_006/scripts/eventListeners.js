const eventListeners = () => {
  let petFactory = new PetFactory(pets);

  document.querySelector("#createPet").addEventListener("click", () => {
    const selectedKey = getDropdownKey(
      document.getElementById("createSelection")
    );
    const petName = document.querySelector("#name").value;
    const species = document.querySelector("#species").value;
    createdPets[selectedKey] = petFactory.createPet(
      selectedKey,
      petName,
      species
    );
    resetNewPet();
    resetPetSelectors();
  });

  document.querySelector("#makeNoise").addEventListener("click", () => {
    const selectedKey = getDropdownKey(
      document.getElementById("createActionSelection")
    );
    let status = document.querySelector("#status");
    status.textContent = "";
    if (selectedKey in createdPets) {
      document.querySelector("#status").textContent =
        createdPets[selectedKey].makeNoise();
    }
  });

  document.querySelector("#purr").addEventListener("click", () => {
    let status = document.querySelector("#status");
    status.textContent = "";
    const selectedKey = getDropdownKey(
      document.getElementById("createActionSelection")
    );
    try {
      if (selectedKey in createdPets) {
        document.querySelector("#status").textContent =
          createdPets[selectedKey].purr();
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
