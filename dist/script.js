let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    e.push(t);
  }
  function n() {
    return e;
  }
  return {
    add: t,
    getAll: n,
    addListItem: function e(t) {
      let n = document.querySelector('.pokemon-list'),
        o = document.createElement('li');
      o.classList.add('list-group-item', 'd-flex', 'justify-content-center');
      let i = document.createElement('button');
      (i.innerText = t.name[0].toUpperCase() + t.name.slice(1)),
        i.classList.add('btn', 'btn-primary'),
        (i.style.minWidth = '30%'),
        o.appendChild(i),
        n.appendChild(o),
        i.addEventListener('click', function () {
          pokemonRepository.showDetails(t);
        });
    },
    loadList: function e() {
      return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            t({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: function e(t) {
      return fetch(t.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          (t.imageUrl = e.sprites.front_default),
            (t.height = e.height),
            (t.types = e.types);
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    showDetails: function e(t) {
      pokemonRepository.loadDetails(t).then(function () {
        var e, n, o;
        let i, r, l;
        (e = t.name),
          (n = 'Height: ' + t.height),
          (o = t.imageUrl),
          (i = document.querySelector('#pokemonModalLabel')),
          (r = document.querySelector('#pokemonHeight')),
          (l = document.querySelector('#pokemonImage')),
          (i.innerText = e[0].toUpperCase() + e.slice(1)),
          (r.innerText = n),
          l.setAttribute('src', o),
          $('#pokemonModal').modal('show');
      });
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
