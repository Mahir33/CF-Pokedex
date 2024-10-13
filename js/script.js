const pokemonList = document.querySelector('.pokemon-list');

console.log(pokemonList);

let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    const modalContainer = document.querySelector('#modal-container');

    // Return an array of Pokemon
    function getAll (){
            return pokemonList;
        }

    // Adds Pokemon to the list
    function add(pokemon) {
                pokemonList.push(pokemon);
                return pokemonList
        }

    // Hide modal with Pokemon details
    function hideModal () {
          const modalContainer = document.querySelector('#modal-container');
          console.log("click");
          modalContainer.classList.remove('is-visible');
      }

    // Show modal with Pokemon details
    function showModal (name, description, image) {
          modalContainer.innerHTML = "";

          // Create modal content
          let modal = document.createElement('div');
          modal.classList.add('modal');

          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = "Close";
          closeButtonElement.addEventListener('click', hideModal);

          let pokemonName = document.createElement('h1');
          pokemonName.innerText = name;

          let pokemonDescription = document.createElement('p');
          pokemonDescription.innerText = `Pokemon height: ${description}`;

          let pokemonImage = document.createElement('img');
          pokemonImage.src = image;

          modal.appendChild(closeButtonElement);
          modal.appendChild(pokemonName);
          modal.appendChild(pokemonDescription);
          modal.appendChild(pokemonImage);

          modalContainer.appendChild(modal);

          // Add class "is-visible" to show modal container
          modalContainer.classList.add('is-visible');
        }

      
    // Fetch and return details of a specific Pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let name = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
            let image = pokemon.imageUrl;
            let height = pokemon.height;
            showModal(name, height, image);
          });
    }

    // Fetch details of a specific Pokemon and add it to the list
    function addListItem(pokemon){
        const pokemonList = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        const buttonElement = document.createElement('button');
        const capitalizedName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        buttonElement.classList.add('poke-button')
        buttonElement.innerText = capitalizedName;
        buttonElement.addEventListener('click', () => {
            showDetails(pokemon);
        });
        
        pokemonList.appendChild(listItem);
        listItem.appendChild(buttonElement);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

      function loadDetails(item) {
        let itemUrl = item.detailsUrl;
        return fetch(itemUrl).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(err => console.error(err))
      }

      window.addEventListener('keydown', (e) => {
        const modalContainer = document.querySelector('#modal-container');
        console.log(e.key)
        if(e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }

        modalContainer.addEventListener('click', (e) => {
          if(e.target === modalContainer){
              hideModal();
            }
        })
    })
    

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }
}
())









pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach((pokemon, i) => {
        const currPokemon = pokemonRepository.getAll()[i]
        pokemonRepository.addListItem(currPokemon)
     });
})



