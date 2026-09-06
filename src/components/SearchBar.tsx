interface SearchBarProps {
  city: string
}

function SearchBar({ city }: SearchBarProps) {
  return (
    <form className="search-bar">
      <label htmlFor="city-search">Search for a city</label>
      <div className="search-controls">
        <input
          id="city-search"
          name="city"
          type="search"
          defaultValue={city}
          placeholder="Enter a city"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  )
}

export default SearchBar
