const displayIdNumber = (i) => {
  switch (true) {
    case (i < 9):
      return "#00" + (+i + 1);
    case (i < 99):
      return "#0" + (+i + 1)
    default:
      return "#" + (+i + 1);
  }
}

const cardTemplate = (id, name) => {
  return `
  <div class="card " id="${name}" height="108" width="104" style="overflow: hidden; border:1px solid silver; border-radius: 8%; background: #FFFFFF;">
        <p style="font-size: 8px; padding-top:4px;  text-align:right;padding-right: 8px; height: 14px; margin-bottom: 0px; color: #666666; ">${displayIdNumber(id)}</p>
          <img class="pokemon-image" loading="lazy" src="./assets/${+id + 1}.png" alt="${name}" style="width: 72px;height: 72px; z-index: 1; margin-bottom: -26px;" />
          <div style=" height:44px; z-index: 0; border-radius: 7%; background-color: #E0E0E0; ">
        <p class="center-screen " style="padding-bottom: 4px;
         border-radius: 7% 7% 10% 10%;   font-size: 10px;
         z-index: 1;margin-top: 26px; text-transform: capitalize;">${name}</p>
          </div>
    `
}

const setAllVisible = () => {
  document.querySelectorAll('.card')
    .forEach(element => {
      element.style.display = ""
    })
}

window.addEventListener('DOMContentLoaded', function () {

 
  let referenceElement = document.getElementById('card-wrapper');


  new Autocomplete("static", {
    selectFirst: true,
    removeResultsWhenInputIsEmpty: true,
    preventScrollUp: true,  
    onSearch: ({ currentValue }) => {
      // static file
      const api = "./Pokemon_Names_Type.json";
      return new Promise((resolve) => {
        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            const result = data
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter((element) => {
                return element.name.match(new RegExp('^' + currentValue, "i"));
              })

            resolve(result);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },

    onResults: ({ currentValue, matches }) => {
      let remove = matches.map((item) => "#" + item['name'])

      setAllVisible()
      //select all the cards that werent found by user input search
      //and apply display hidden
      document.querySelectorAll('.card:not(' + remove + ')')
        .forEach(element => {
          element.style.display = "none"
        })

     

      return matches.map((el) => {
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
      //setAllVisible()

      document.getElementsByClassName("auto-results-wrapper auto-is-active")[0].classList.remove('auto-is-active');
      document.querySelectorAll('.card:not(#' + name + ')')
        .forEach(element => {
          element.style.display = "none"
        })
     
           //https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg" alt="${name}"
     
    },

    // get index and data from li element after
    // hovering over li with the mouse
    onSelectedItem: ({ index, element, object }) => {
      console.log("onSelectedItem:", index, element.value, object);
    },

    onReset: () => {
  
      setAllVisible()
    },


    //on first render of the input(Autosuggest) field
    onRender: () => {
      const api = "./Pokemon_Names_Type.json";
      return new Promise((resolve) => {
        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            for (const [key, value] of data.entries()) {
              referenceElement.insertAdjacentHTML("beforeend", cardTemplate(key, value.name))
            }
            resolve(data);

          })
          .catch((error) => {
            console.error(error);
          });
      });

    }
  });

});