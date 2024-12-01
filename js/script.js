let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');

    listItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-center'
    );

    let button = document.createElement('button');
    button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerText =
      pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    modalBody.innerHTML = `
      <img src="${pokemon.imageUrl}" alt="Image of ${pokemon.name}" class="img-fluid">
      <p>Height: ${pokemon.height}</p>
    `;

    $('#pokemonModal').modal('show');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});
