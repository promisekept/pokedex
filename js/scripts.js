let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    console.log(pokemon);
    let correctParameters = true;
    if (typeof pokemon === "object") {
      Object.keys(pokemon).forEach(function (property) {
        if (
          !(property === "name" || property === "height" || property === "type")
        ) {
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
    console.log(pokemon);
  }
  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon.name);
    });
  }

  function LoadList() {
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
      .then(function (response) {
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
      });
  }
  LoadList();
  console.log(pokemonList);
  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
    LoadList: LoadList,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
