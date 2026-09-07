interface SearchBarProps {
  city: string
  onCityChange: (city: string) => void
  onSearch: () => void
}

function SearchBar({ city, onCityChange, onSearch }: SearchBarProps) {
  return (
    <form
      className="mt-10 max-w-2xl"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <label className="mb-2 block text-sm font-bold text-[#5c7373]" htmlFor="city-search">Search for a city</label>
      <div className="flex gap-2.5 max-[640px]:flex-col">
        <input
          id="city-search"
          name="city"
          type="search"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          className="min-w-0 flex-1 rounded-md border border-[#d7e3dc] bg-white px-4 py-3.5 text-base text-[#163236] outline-none focus-visible:ring-4 focus-visible:ring-[#177b76]/20"
          placeholder="Enter a city"
        />
        <button className="rounded-md bg-[#177b76] px-6 font-bold text-white transition-colors hover:bg-[#12645f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#177b76]/20 max-[640px]:min-h-12" type="submit">Search</button>
      </div>
    </form>
  )
}

export default SearchBar
