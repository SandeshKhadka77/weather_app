interface SearchBarProps {
  city: string
  onCityChange: (city: string) => void
  onSearch: () => void
}

function SearchBar({ city, onCityChange, onSearch }: SearchBarProps) {
  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <label htmlFor="city-search">Search for a city</label>
      <div className="search-controls">
        <input
          id="city-search"
          name="city"
          type="search"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="Enter a city"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  )
}

export default SearchBar
