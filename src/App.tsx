import { useState } from 'react'
import { Sunrise, Sunset } from 'lucide-react'
import Header from './components/Header'
import ForecastList from './components/ForecastList'
import HourlyForecast from './components/HourlyForecast'
import SearchBar from './components/SearchBar'
import WeatherDetails from './components/WeatherDetails'
import WeatherCard from './components/WeatherCard'

function App() {
  const [searchCity, setSearchCity] = useState('Kathmandu')
  const [selectedCity, setSelectedCity] = useState('Kathmandu')

  const forecast = [
    { day: 'Today', condition: 'partly-cloudy' as const, high: 26, low: 16 },
    { day: 'Tue, Sep 9', condition: 'sunny' as const, high: 27, low: 17 },
    { day: 'Wed, Sep 10', condition: 'rainy' as const, high: 25, low: 16 },
    { day: 'Thu, Sep 11', condition: 'cloudy' as const, high: 24, low: 15 },
    { day: 'Fri, Sep 12', condition: 'sunny' as const, high: 26, low: 16 },
  ]

  const hourlyForecast = [
    { time: 'Now', condition: 'partly-cloudy' as const, temperature: 22 },
    { time: '6 PM', condition: 'sunny' as const, temperature: 21 },
    { time: '7 PM', condition: 'night' as const, temperature: 19 },
    { time: '8 PM', condition: 'night' as const, temperature: 18 },
    { time: '9 PM', condition: 'night' as const, temperature: 17 },
    { time: '10 PM', condition: 'night' as const, temperature: 16 },
  ]

  function handleSearch(): void {
    const trimmedCity = searchCity.trim()

    if (trimmedCity.length > 0) {
      setSelectedCity(trimmedCity)
    }
  }

  return (
    <div className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-6xl text-[#c2d1e3] sm:w-[calc(100%-2.5rem)]">
      <Header />

      <main className="py-8 sm:py-10">
        <SearchBar city={searchCity} onCityChange={setSearchCity} onSearch={handleSearch} />

        <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.8fr)]">
          <div className="grid min-w-0 gap-4">
            <WeatherCard city={selectedCity} country="NP" temperature={22} condition="Partly cloudy" feelsLike={22} />
            <WeatherDetails humidity={68} windSpeed={12} visibility={10} pressure={1012} />
            <HourlyForecast hours={hourlyForecast} />
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <ForecastList forecast={forecast} />
            <section className="rounded-2xl border border-white/10 bg-[#102544] p-5" aria-labelledby="sun-title">
              <h2 className="mb-5 text-sm font-semibold text-white" id="sun-title">Sunrise & sunset</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#17385e] p-3"><Sunrise className="mb-3 size-5 text-[#ffd365]" /><p className="text-xs text-[#8ba3c1]">Sunrise</p><p className="mt-1 font-semibold text-white">5:47 AM</p></div>
                <div className="rounded-xl bg-[#17385e] p-3"><Sunset className="mb-3 size-5 text-[#ff9e72]" /><p className="text-xs text-[#8ba3c1]">Sunset</p><p className="mt-1 font-semibold text-white">6:04 PM</p></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
