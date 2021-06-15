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

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(`${pokemon.name} (height: ${pokemon.height}) `);
  if (pokemon.height >= 1) {
    document.write(`Wow, that's big!`);
  }
  document.write(`<br><br>`);
});
