window.addEventListener('DOMContentLoaded', function () {
  
  const info = document.querySelector(".info-d");
                 
  new Autocomplete("static", {
    selectFirst:true,
    removeResultsWhenInputIsEmpty: true,
    onSearch: ({ currentValue }) => {
      // static file
      const api = "/Pokemon_Names_Type.json";
  
      return new Promise((resolve) => {
        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            const result = data
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter((element) => {
                return element.name.match(new RegExp('^'+currentValue, "i"));
              });
            resolve(result);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
  
    onResults: ({ currentValue, matches }) => {
      return matches
        .map((el) => {
          return `
            <li>
              <p>${el.name.replace(
                new RegExp(currentValue, "gi"),
                (str) => `<b>${str}</b>`
              )}</p>
            </li>`;
        })
        .join("");
    },

    
  // event onsubmit
  onSubmit: ({ index, element, object }) => {
    const { name, ID, status, img } = object;

    console.table("static-file-data", index, element, object);

    //https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg" alt="${name}"
    const template = `
    <div class="card" height="108" width="104"
    style="border:1px solid silver">
    <p style="margin: 0px; padding-top:4px; text-align:right;padding-right: 8px;">${ID}</p>
    <img class="center-screen pokemon-image"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/304.png"
    style="width: 72px;height: 72px;">
    <p class="center-screen pokemon-name" style="margin: 0px; ">${name}</p>
    </div>`;

    info.textContent = "";
    info.classList.add("active-data");
    info.insertAdjacentHTML("beforeend", template);
  },

  // get index and data from li element after
  // hovering over li with the mouse
  onSelectedItem: ({ index, element, object }) => {
    console.log("onSelectedItem:", index, element.value, object);
  },

  onReset: () => {
    info.textContent = "";
    info.classList.remove("active-data");
  },
  });

  
  
              
              
  });