let pokemonRepository = (function () {
  let e = fetch("https://pokeapi.co/api/v2/pokemon/?limit=10").then(function (
      e
    ) {
      return e
        .json()
        .then(function (e) {
          return e.results;
        })
        .catch(function (e) {});
    }),
    t = function (e) {
      let t = "Type(s): ";
      return e.forEach((e) => (t += e.type.name + " ")), t;
    };
  return {
    pokemonList: e,
    addListItem: function (e, n) {
      let o = document.querySelector("ul.list-group"),
        r = document.createElement("li");
      r.classList.add("list-group-item", "bg-warning");
      let i = document.createElement("button");
      (i.innerText = e),
        i.classList.add("btn", "btn-primary", "w-50", "w-sm-50"),
        i.setAttribute("data-bs-target", "#pokemonModal"),
        i.setAttribute("data-bs-toggle", "modal"),
        i.addEventListener("click", function () {
          !(function (e) {
            fetch(e).then(function (e) {
              return e.json().then(function (e) {
                let n = document.querySelector(".front");
                n.setAttribute("src", e.sprites.front_default),
                  n.setAttribute("alt", `front of ${e.name}`);
                let o = document.querySelector(".back");
                o.setAttribute("src", e.sprites.back_default),
                  o.setAttribute("alt", `back of ${e.name}`),
                  (document.querySelector(
                    ".height"
                  ).innerText = `Height: ${e.height}`),
                  (document.querySelector(
                    ".weight"
                  ).innerText = `Weight: ${e.weight}`),
                  (document.querySelector(".type").innerText = t(e.types));
              });
            });
          })(n),
            (document.querySelector(".modal-title").innerText =
              e.toUpperCase());
        }),
        r.append(i),
        o.append(r);
    },
    clearAllItems: function () {
      document.querySelector("ul.list-group").innerHTML = "";
    },
  };
})();
pokemonRepository.pokemonList.then(function (e) {
  function t(e) {
    pokemonRepository.addListItem(e.name, e.url);
  }
  e.map((e) => t(e));
  let n = document.querySelector("#searchBar");
  n.addEventListener("keyup", function () {
    pokemonRepository.clearAllItems();
    let o = n.value;
    e.filter((e) => {
      e.name.includes(o) && t(e);
    });
  });
});
