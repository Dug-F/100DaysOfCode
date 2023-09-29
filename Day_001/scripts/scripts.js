let pet = null;

class Pet {
    kinds = [
        'Big, scary',
        'Small, cuddly',
        'Hungry',
        'Bald',
        'Bored'
    ]

    constructor (type) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    kind() {
        return this.kinds[Math.floor(Math.random() * this.kinds.length)];
        
        // return kinds[Math.floor(Math.random() * this.kinds.length)];
    }
}

const createPet = (petType) => {
  pet = new Pet(petType)
};

const showCurrent = () => {
    if (pet) { 
        document.querySelector( "#current" ).textContent = `pet type: ${pet.type}`; 
    } else {
        document.querySelector("#current").textContent = 'No current pet object';
    }
}

const setNew = () => {
    if (pet) {
        pet.type = document.querySelector("#new").value;
    }
    
}

const eventListeners = () => {
  document.querySelector("#create").addEventListener("click", () => {
    createPet(document.querySelector('#initial').value);
    console.log(pet);
  });
  document.querySelector("#getCurrent").addEventListener("click", () => {
    showCurrent();
  })
  document.querySelector("#set").addEventListener("click", () => {
    setNew();
  })

  document.querySelector('#whatKind').addEventListener("click", () => {
    document.querySelector('#kind').textContent = `${pet.kind()} ${pet.type}`;
  })
};

eventListeners();
