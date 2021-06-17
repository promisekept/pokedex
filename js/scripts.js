let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
    { name: "Pidgey", height: 0.3, types: ["flying", "normal"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
  ];
  function add(pokemon) {
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
    // button.addEventListener("click", function () {
    //   showDetails(pokemon.name);
    // });
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

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
