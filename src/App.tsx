import { useState } from 'react'
import Header from './components/Header'
import ForecastList from './components/ForecastList'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'

function App() {
  const [searchCity, setSearchCity] = useState('Kathmandu')
  const [selectedCity, setSelectedCity] = useState('Kathmandu')

  const forecast = [
    { day: 'Monday', condition: 'Sunny', high: 24, low: 16 },
    { day: 'Tuesday', condition: 'Sunny', high: 25, low: 17 },
    { day: 'Wednesday', condition: 'Cloudy', high: 22, low: 15 },
    { day: 'Thursday', condition: 'Rainy', high: 19, low: 14 },
    { day: 'Friday', condition: 'Sunny', high: 23, low: 15 },
  ]

  function handleSearch(): void {
    const trimmedCity = searchCity.trim()

    if (trimmedCity.length > 0) {
      setSelectedCity(trimmedCity)
    }
  }

  return (
    <div className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-6xl sm:w-[calc(100%-2.5rem)]">
      <Header />

      <main className="py-14 sm:py-20">
        <section className="max-w-2xl" aria-labelledby="page-title">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#f07c62]">Weather dashboard</p>
          <h1 className="mb-5 max-w-2xl text-5xl font-bold leading-[0.98] tracking-normal sm:text-7xl" id="page-title">Know your weather before you step outside.</h1>
          <p className="max-w-lg text-base leading-relaxed text-[#5c7373] sm:text-lg">
            Search for a city to see current conditions and a five-day forecast.
          </p>
        </section>

        <SearchBar
          city={searchCity}
          onCityChange={setSearchCity}
          onSearch={handleSearch}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <WeatherCard
            city={selectedCity}
            country="NP"
            temperature={22}
            condition="Sunny"
            humidity={48}
            windSpeed={12}
            feelsLike={23}
          />
          <ForecastList forecast={forecast} />
        </div>
      </main>
    </div>
  )
}

export default App
