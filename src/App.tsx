import Header from './components/Header'
import ForecastList from './components/ForecastList'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'

function App() {
  const forecast = [
    { day: 'Monday', condition: 'Sunny', high: 24, low: 16 },
    { day: 'Tuesday', condition: 'Sunny', high: 25, low: 17 },
    { day: 'Wednesday', condition: 'Cloudy', high: 22, low: 15 },
    { day: 'Thursday', condition: 'Rainy', high: 19, low: 14 },
    { day: 'Friday', condition: 'Sunny', high: 23, low: 15 },
  ]

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Weather dashboard</p>
          <h1 id="page-title">Know your weather before you step outside.</h1>
          <p className="intro-text">
            Search for a city to see current conditions and a five-day forecast.
          </p>
        </section>

        <SearchBar city="Kathmandu" />

        <div className="weather-layout">
          <WeatherCard
            city="Kathmandu"
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
