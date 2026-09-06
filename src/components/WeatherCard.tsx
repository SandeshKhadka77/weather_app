interface WeatherCardProps {
  city: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  feelsLike: number
}

function WeatherCard({
  city,
  country,
  temperature,
  condition,
  humidity,
  windSpeed,
  feelsLike,
}: WeatherCardProps) {
  return (
    <section className="weather-card" aria-labelledby="current-weather-title">
      <div className="weather-card-heading">
        <div>
          <p className="card-label">Current weather</p>
          <h2 id="current-weather-title">
            {city}, {country}
          </h2>
          <p className="weather-condition">{condition}</p>
        </div>
        <span className="weather-icon" role="img" aria-label={condition}>
          ☀
        </span>
      </div>

      <div className="temperature-row">
        <strong>{temperature}°</strong>
        <span>Feels like {feelsLike}°</span>
      </div>

      <dl className="weather-details">
        <div>
          <dt>Humidity</dt>
          <dd>{humidity}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{windSpeed} km/h</dd>
        </div>
      </dl>
    </section>
  )
}

export default WeatherCard
