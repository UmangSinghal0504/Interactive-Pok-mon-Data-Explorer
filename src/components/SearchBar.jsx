const TYPES = [
    'all', 'fire', 'water', 'grass',
    'electric', 'psychic', 'poison'
];

export default function SearchBar({
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType
}) {
    return (
        <div className="search-bar">
            <input 
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        
            />
            <select value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}>
                {TYPES.map(type => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}

                    </option>
                ))}

            </select>
        </div>
    );
}