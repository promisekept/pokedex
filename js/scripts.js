let pokemonList = [];
pokemonList.push(
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
  { name: "Pidgey", height: 0.3, types: ["flying", "normal"] },
  { name: "Nidoking", height: 1.4, types: ["ground", "poison"] }
);
for (let i = 0; i < pokemonList.length; i++) {
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})  `);
  if (pokemonList[i].height >= 1) {
    document.write(`Wow, that's big!`);
  }
  document.write(`<br><br>`);
}
