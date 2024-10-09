const pokemonList = document.querySelector('.pokemon-list');

console.log(pokemonList);

let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll (){
            return pokemonList;
        }
    function add(pokemon) {
                pokemonList.push(pokemon);
                return pokemonList
        }
    function findPokemon(searchedPokemon) {
            let foundPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase() === searchedPokemon.toLowerCase());
            if(foundPokemon.length !== 0) {
                console.log(foundPokemon);
                console.log(`${searchedPokemon[0] + searchedPokemon.slice(1)} was found!`)
                return foundPokemon;
            } else {
                console.error('No pokemon found with the given name.');
                return null;
            }
        }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function addListItem(pokemon){
        const pokemonList = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('poke-button')
        buttonElement.innerText = pokemon.name;
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
    

    return {
        add: add,
        findPokemon: findPokemon,
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
    
        // document.write(`${pokemon.name} (height: ${pokemon.height}) ${pokemon.height > 1.5 ? " - Wow, that's big!" : ""} <br>`);
     });
})



//  const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let obj = {key: 'value'}
//         if (Object.keys(obj).length > 0)  {
//         resolve(console.log(obj));
//         } else {
//             reject('promise rejected')
//         }
//     }, 2000);
//  })

// let jsonStringFromServer = '{"name":"Lisa","age":27}';
// let lisa = JSON.parse(jsonStringFromServer);
// console.log(lisa.name, lisa.age); // 'Lisa', 27

const settings = {method: 'GET'}
fetch('https://pokeapi.co/api/v2/pokemon/?limit=150', settings).then(function (res) {
    return res.json();
}).then(pokeList => console.log(pokeList)).catch(error => console.error(error))