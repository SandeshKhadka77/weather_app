function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#d7e3dc] py-5 sm:py-7">
      <a className="inline-flex items-center gap-2.5 font-bold text-[#163236] no-underline" href="/" aria-label="Weather app home">
        <span className="grid size-8 place-items-center rounded-[10px] bg-[#177b76] text-sm text-white" aria-hidden="true">
          W
        </span>
        <span>Weatherly</span>
      </a>

      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#5c7373] max-[640px]:hidden">Personal forecast</span>
    </header>
  )
}

export default Header
