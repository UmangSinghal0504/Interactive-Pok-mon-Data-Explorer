import axios from 'axios';

export const fetchPokemonList = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    return data.results;
};

export const fetchPokemonDetails = async (url) => {
    const { data } = await axios.get(url);
    return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name)
    };
};