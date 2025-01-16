const form = document.getElementById('pokemon-form');
const input = documentgetElementById('pokemon-name');
const pokemonInfoDiv = documentgetElementById('pokemon-info');

async function fetchPokemonData(pokemonName) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    
        if (!response.ok) {
            throw new Error(`Pokemon no encontrado`);
        }

        const data = await response.json()
        displayPokemonInfo(data);
    } catch (error){
            pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
            pokemonInfoDiv.style.display = `block`;
        }

    function displayPokemonInfo(pokemon) {
        const {name, sprites, types, abilities} = pokemon;

        pokemonInfoDiv.innerHTML =`
        <img src="${sprites.front_default}" alt="${naeme}">
        <h3>${name.charAt(0).toUpperCase() + name.slice(1)}<h3>
        <p>Tipo:${types.map(type => type.type.name).join(´, ´)}</p>
        <p>Habilidades:${abilities.map(ability => ability.ability.name).join(´, ´)}</p>
        `;

        pokemonInfoDiv.style.display = `block`;
    }

    form.addEventListener(`submit,`, function(event){
        event.preventDefault();
        const pokemonName = input.value.trim();
        if(pokemonName) {
            fetchPokemonData(pokemonName);
        }
    });
}