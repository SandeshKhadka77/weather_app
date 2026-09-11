import { useEffect, useState } from 'react'
import { Sunrise, Sunset } from 'lucide-react'
import Header from './components/Header'
import ForecastList from './components/ForecastList'
import HourlyForecast from './components/HourlyForecast'
import SearchBar from './components/SearchBar'
import WeatherDetails from './components/WeatherDetails'
import WeatherCard from './components/WeatherCard'
import { fetchWeatherByCity } from './services/weatherService'
import type { WeatherData } from './types/weather'

function App() {
  const [searchCity, setSearchCity] = useState('Kathmandu')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  async function loadWeather(city: string): Promise<void> {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const weatherData = await fetchWeatherByCity(city)
      setWeather(weatherData)
      setSearchCity(weatherData.city)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not load weather data.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // The first request synchronizes the initial screen with the weather service.
    void loadWeather('Kathmandu')
  }, [])

  function handleSearch(): void {
    const trimmedCity = searchCity.trim()

    if (trimmedCity.length > 0) {
      void loadWeather(trimmedCity)
    }
  }

  return (
    <div className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-6xl text-[#c2d1e3] sm:w-[calc(100%-2.5rem)]">
      <Header />

      <main className="py-8 sm:py-10">
        <SearchBar city={searchCity} onCityChange={setSearchCity} onSearch={handleSearch} />

        {errorMessage && (
          <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">
            {errorMessage}
          </p>
        )}

        {isLoading && (
          <p className="mt-5 text-sm text-[#8ba3c1]" role="status">Loading weather for {searchCity}...</p>
        )}

        {weather && !isLoading && (
          <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.8fr)]">
          <div className="grid min-w-0 gap-4">
            <WeatherCard city={weather.city} country={weather.country} temperature={weather.temperature} condition={weather.condition} feelsLike={weather.feelsLike} />
            <WeatherDetails humidity={weather.humidity} windSpeed={weather.windSpeed} visibility={weather.visibility} pressure={weather.pressure} />
            <HourlyForecast hours={weather.hourlyForecast} />
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <ForecastList forecast={weather.dailyForecast} />
            <section className="rounded-2xl border border-white/10 bg-[#102544] p-5" aria-labelledby="sun-title">
              <h2 className="mb-5 text-sm font-semibold text-white" id="sun-title">Sunrise & sunset</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#17385e] p-3"><Sunrise className="mb-3 size-5 text-[#ffd365]" /><p className="text-xs text-[#8ba3c1]">Sunrise</p><p className="mt-1 font-semibold text-white">5:47 AM</p></div>
                <div className="rounded-xl bg-[#17385e] p-3"><Sunset className="mb-3 size-5 text-[#ff9e72]" /><p className="text-xs text-[#8ba3c1]">Sunset</p><p className="mt-1 font-semibold text-white">6:04 PM</p></div>
              </div>
            </section>
          </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
