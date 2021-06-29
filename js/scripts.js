let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    let correctParameters = true;
    if (typeof pokemon === "object") {
      Object.keys(pokemon).forEach(function (property) {
        if (!(property === "name" || property === "url")) {
          correctParameters = false;
        }
      });
    }
    if (correctParameters) {
      pokemonList.push(pokemon);
    }
  }
  function getAll() {
    return pokemonList;
  }
  function findPokemon(name) {
    let pokemon = pokemonList.filter((pokemon) => pokemon.name === name)[0];
    document.write(`
    Found: 
    ${pokemon.name}
    ${pokemon.height}
    ${pokemon.types}
    `);
  }
  function addListItem(pokemon) {
    let pokemonUOList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    pokemonUOList.appendChild(listItem);
    addListener(button, pokemon);
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }
  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function LoadList() {
    showLoadingMessage();
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (list) {
        list.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            url: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    return fetch(item.url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json().then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showLoadingMessage() {
    let ul = document.querySelector(".pokemon-list");
    ul.classList.add("ul_invisible");
    let body = document.querySelector("body");
    let paragraph = document.createElement("p");
    paragraph.innerText = "Please wait while the pokemon are loading...";
    body.appendChild(paragraph);
  }
  function hideLoadingMessage() {
    let ul = document.querySelector(".pokemon-list");
    ul.classList.remove("ul_invisible");
    let elementToRemove = document.querySelector("p");
    elementToRemove.parentElement.removeChild(elementToRemove);
  }

  function showModal(name, height, url) {
    // create the modal and add it to the container
    let container = document.querySelector(".container");
    let theModal = document.createElement("div");
    theModal.classList.add("theModal");
    container.appendChild(theModal);

    container.addEventListener("click", function (e) {
      let modalParent = document.querySelector(".theModal");
      if (modalParent && e.target) {
        !modalParent.contains(e.target) && hideModal();
      }
    });

    //add information about the pokemon
    let topRow = document.createElement("div");
    topRow.classList.add("topRow");
    let pokemonName = document.createElement("h3");
    pokemonName.innerText = name;
    let pokemonHeight = document.createElement("span");
    pokemonHeight.innerText = `height: ${height}`;
    let closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", hideModal);
    let pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", `${url}`);
    topRow.appendChild(pokemonName);
    topRow.appendChild(closeButton);
    theModal.appendChild(topRow);
    theModal.appendChild(pokemonHeight);
    theModal.appendChild(pokemonImg);
  }
  //Hides the modal
  function hideModal() {
    let modal = document.querySelectorAll(".theModal");
    for (const elem of modal) {
      elem.remove();
    }
  }
  //hides the modal when escape is pressed
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModal();
    }
  });
  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
    LoadList: LoadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.LoadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
