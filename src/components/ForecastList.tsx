interface ForecastDay {
  day: string
  condition: string
  high: number
  low: number
}

interface ForecastListProps {
  forecast: ForecastDay[]
}

function ForecastList({ forecast }: ForecastListProps) {
  return (
    <section className="forecast-section" aria-labelledby="forecast-title">
      <div className="section-heading">
        <p className="card-label">Plan ahead</p>
        <h2 id="forecast-title">Five-day forecast</h2>
      </div>

      <div className="forecast-list">
        {forecast.map((day) => (
          <article className="forecast-card" key={day.day}>
            <h3>{day.day}</h3>
            <span className="forecast-icon" role="img" aria-label={day.condition}>
              {day.condition === 'Rainy' ? '☂' : '☀'}
            </span>
            <p>{day.condition}</p>
            <div className="forecast-temperatures">
              <strong>{day.high}°</strong>
              <span>{day.low}°</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForecastList
