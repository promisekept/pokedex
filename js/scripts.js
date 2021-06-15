let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
    { name: "Pidgey", height: 0.3, types: ["flying", "normal"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
  ];
  function add(name, height, type) {
    pokemonList.push(name, height, type);
  }
  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(`${pokemon.name} (height: ${pokemon.height}) `);
  if (pokemon.height >= 1) {
    document.write(`Wow, that's big!`);
  }
  document.write(`<br><br>`);
});
