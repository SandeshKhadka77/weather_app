import { CloudSun, MapPin, Search, UserCircle } from 'lucide-react'

function Header() {
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-white/10 py-4 sm:flex-nowrap sm:py-5">
      <a className="inline-flex shrink-0 items-center gap-2.5 font-semibold text-white no-underline" href="/" aria-label="Weather app home">
        <span className="grid size-8 place-items-center rounded-xl bg-[#1d5b91] text-[#8dc7ff]" aria-hidden="true">
          <CloudSun className="size-5" strokeWidth={1.8} />
        </span>
        <span>Weatherly</span>
      </a>

      <div className="order-3 flex w-full flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#102544] px-3 py-2.5 sm:order-2 sm:mx-6 sm:w-auto">
        <Search className="size-4 text-[#6d8eb2]" aria-hidden="true" />
        <input className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#6d8eb2]" type="search" placeholder="Search for a city..." aria-label="Search for a city" />
      </div>

      <div className="order-2 ml-auto flex items-center gap-2 text-xs text-[#c2d1e3] sm:order-3">
        <MapPin className="size-3.5 text-[#66b7ff]" aria-hidden="true" />
        <span>Kathmandu, Nepal</span>
        <UserCircle className="ml-2 size-7 text-[#6d8eb2]" aria-label="User profile" />
      </div>
    </header>
  )
}

export default Header
