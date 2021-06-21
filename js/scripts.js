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
    loadDetails(pokemon);
  }
  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
      console.log(pokemon);
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
