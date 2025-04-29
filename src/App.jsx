import { useEffect, useState } from "react";
import { fetchPokemonDetails, fetchPokemonList } from "./api/pokeapi";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";






function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const list = await fetchPokemonList();
        const details = await Promise.all(list.map(p => fetchPokemonDetails(p.url)));
        setPokemon(details);
        setFilteredPokemon(details);
      } catch (error) {
        console.error("Failed to fetch Pokemon :", error);
      } finally{
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let results = pokemon;
    if (searchTerm) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if(selectedType !== 'all') {
      results = results.filter(p =>
        p.types.includes(selectedType)
      );
    }
    setFilteredPokemon(results);

  }, [searchTerm, selectedType, pokemon]);

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="app">
      <header>
        <h1>PokeExplorer</h1>
      </header>
      <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      />
      <div className="pokemon-grid">
        {filteredPokemon.length > 0 ? (
          
            filteredPokemon.map(p => <PokemonCard key={p.id} pokemon={p} />)

          ) : (
            <div className="empty">No Pokemon found!</div>
          
        )}

      </div>
    </div>
  );
}

export default App;