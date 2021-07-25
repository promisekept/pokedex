let pokemonRepository = (function () {
  let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=10";

  let pokemonList = fetch(apiURL).then(function (response) {
    return response
      .json()
      .then(function (json) {
        return json.results;
      })
      .catch(function (e) {
        console.error(e);
      });
  });

  let getTypes = function (type) {
    let typeString = "Type(s): ";
    type.forEach((type) => (typeString += type.type.name + " "));
    return typeString;
  };

  function fillModal(pokemonUrl) {
    fetch(pokemonUrl).then(function (response) {
      return response.json().then(function (pokemon) {
        let front = document.querySelector(".front");
        front.setAttribute("src", pokemon.sprites.front_default);
        let back = document.querySelector(".back");
        back.setAttribute("src", pokemon.sprites.back_default);
        let height = document.querySelector(".height");
        height.innerText = `Height: ${pokemon.height}`;
        let weight = document.querySelector(".weight");
        weight.innerText = `Weight: ${pokemon.weight}`;
        let type = document.querySelector(".type");
        type.innerText = getTypes(pokemon.types);
      });
    });
  }

  function addListItem(name, pokemonUrl) {
    let pokemonGroup = document.querySelector("ul.list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "bg-warning");
    let button = document.createElement("button");
    button.innerText = name;
    button.classList.add("btn", "btn-primary", "w-50", "w-sm-50");
    button.setAttribute("data-bs-target", "#pokemonModal");
    button.setAttribute("data-bs-toggle", "modal");
    button.addEventListener("click", function () {
      fillModal(pokemonUrl);
      let title = document.querySelector(".modal-title");
      title.innerText = name;
    });
    listItem.append(button);
    pokemonGroup.append(listItem);
  }
  let clearAllItems = function () {
    document.querySelector("ul.list-group").innerHTML = "";
  };
  return {
    pokemonList: pokemonList,
    addListItem: addListItem,
    clearAllItems: clearAllItems,
  };
})();

pokemonRepository.pokemonList.then(function (list) {
  function sendParams(pokemon) {
    pokemonRepository.addListItem(pokemon.name, pokemon.url);
  }
  list.map((pokemon) => sendParams(pokemon));
  let searchBar = document.querySelector("#searchBar");
  searchBar.addEventListener("keyup", function () {
    pokemonRepository.clearAllItems();
    let searchString = searchBar.value;
    list.filter((pokemon) => {
      if (pokemon.name.includes(searchString)) {
        sendParams(pokemon);
      }
    });
  });
});
