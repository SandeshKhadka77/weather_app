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
    <section className="min-w-0 rounded-lg border border-[#d7e3dc] bg-white p-5 sm:p-7" aria-labelledby="forecast-title">
      <div className="mb-6 flex items-end justify-between">
        <p className="mb-0 text-xs font-bold uppercase tracking-[0.08em] text-[#f07c62]">Plan ahead</p>
        <h2 className="mb-0 text-[1.45rem]" id="forecast-title">Five-day forecast</h2>
      </div>

      <div className="grid min-w-0 grid-cols-5 gap-2 overflow-x-auto pb-1 max-[640px]:grid-cols-[repeat(5,minmax(92px,1fr))]">
        {forecast.map((day) => (
          <article className="min-w-0 rounded-md bg-[#e4f1eb] px-2 py-3.5 text-center" key={day.day}>
            <h3 className="mb-4 text-[0.82rem]">{day.day}</h3>
            <span className="mb-3 block text-3xl" role="img" aria-label={day.condition}>
              {day.condition === 'Rainy' ? '☂' : '☀'}
            </span>
            <p className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#5c7373]">{day.condition}</p>
            <div className="flex items-baseline justify-center gap-1 text-xs">
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
