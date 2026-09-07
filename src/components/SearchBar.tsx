import { Search } from 'lucide-react'

interface SearchBarProps {
  city: string
  onCityChange: (city: string) => void
  onSearch: () => void
}

function SearchBar({ city, onCityChange, onSearch }: SearchBarProps) {
  return (
    <form
      className="mt-8 max-w-xl"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <label className="sr-only" htmlFor="city-search">Search for a city</label>
      <div className="flex gap-2.5">
        <input
          id="city-search"
          name="city"
          type="search"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#102544] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#6d8eb2] focus-visible:ring-4 focus-visible:ring-[#42a5f5]/20"
          placeholder="Enter a city"
        />
        <button className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#2b83c6] text-white transition-colors hover:bg-[#3b94d8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42a5f5]/20" type="submit" aria-label="Search"><Search className="size-4" /></button>
      </div>
    </form>
  )
}

export default SearchBar
