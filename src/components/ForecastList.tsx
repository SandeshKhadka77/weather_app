import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react'

interface ForecastDay {
  day: string
  condition: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy'
  high: number
  low: number
}

interface ForecastListProps {
  forecast: ForecastDay[]
}

function ForecastList({ forecast }: ForecastListProps) {
  const weatherIcons = { sunny: Sun, 'partly-cloudy': CloudSun, cloudy: Cloud, rainy: CloudRain }

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#102544] p-4 sm:p-5" aria-labelledby="forecast-title">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="mb-0 text-sm font-semibold text-white" id="forecast-title">5-day forecast</h2>
        <span className="text-xs text-[#8ba3c1]">Kathmandu</span>
      </div>

      <div className="grid min-w-0 gap-1">
        {forecast.map((day) => (
          <article className="grid grid-cols-[minmax(72px,0.8fr)_34px_1fr_auto] items-center gap-3 border-b border-white/8 px-2 py-3 last:border-b-0" key={day.day}>
            <h3 className="text-xs font-medium text-[#c2d1e3]">{day.day}</h3>
            {(() => {
              const Icon = weatherIcons[day.condition]
              return <Icon className="size-5 text-[#8dc7ff]" strokeWidth={1.8} aria-label={day.condition} />
            })()}
            <p className="truncate text-xs text-[#8ba3c1]">{day.condition.replace('-', ' ')}</p>
            <div className="flex items-baseline gap-2 text-xs">
              <strong className="text-white">{day.high}°</strong>
              <span className="text-[#718baa]">{day.low}°</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForecastList
