/* jshint esversion: 6 */

const pokemonList = [
    {
        id: 0o0001,
        name: 'Bulbasaur',
        hp: 45,
        attack: 49,
        defense: 49,
        spAttack: 65,
        spDefense: 65,
        speed: 45,
        height: 0.7,
        types: ['grass', 'poison'],
        picture: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/bulbasaur.avif"
    },
    {
        id: 0o0002,
        name: 'Ivysaur',
        hp: 60,
        attack: 62,
        defense: 63,
        spAttack: 80,
        spDefense: 80,
        speed: 60,
        height: 1,
        types: ['grass', 'poison'],
        picture: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/ivysaur.avif"
    },
    {
        id: 0o0003,
        name: 'Venusaur',
        hp: 80,
        attack: 82,
        defense: 83,
        spAttack: 100,
        spDefense: 100,
        speed: 80,
        height: 2,
        types: ['grass', 'poison'],
        picture: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/venusaur.avif"
    },
    {
        id: 0o0004,
        name: 'Charmander',
        hp: 39,
        attack: 52,
        defense: 43,
        spAttack: 60,
        spDefense: 50,
        speed: 65,
        height: 0.6,
        types: ['fire'],
        picture: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charmander.avif"
    },
    {
        id: 0o0005,
        name: 'Charmeleon',
        hp: 58,
        attack: 64,
        defense: 58,
        spAttack: 80,
        spDefense: 65,
        speed: 80,
        height: 1.1,
        types: ['fire'],
        picture: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charmeleon.avif"
    },
    {
        id: 0o0006,
        name: 'Charizard',
        hp: 78,
        attack: 84,
        defense: 78,
        spAttack: 109,
        spDefense: 85,
        speed: 100,
        height: 1.7,
        types: ['fire', 'flying'],
        picture: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charizard.avif"
    }
];

for(let i= 0; i < pokemonList.length; i++){
    document.write(
        `${pokemonList[i].name} (height: ${pokemonList[i].height}) 
        ${pokemonList[i].height > 1.5 ? "- Wow, that's big!" : ""} 
        <br>`
    );
}