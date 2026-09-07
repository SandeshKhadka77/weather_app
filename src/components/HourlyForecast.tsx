import { Cloud, CloudRain, CloudSun, Moon, Sun } from 'lucide-react'

interface HourlyForecastItem {
  time: string
  condition: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'night'
  temperature: number
}

interface HourlyForecastProps {
  hours: HourlyForecastItem[]
}

const weatherIcons = {
  sunny: Sun,
  'partly-cloudy': CloudSun,
  cloudy: Cloud,
  rainy: CloudRain,
  night: Moon,
}

function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#102544] p-4 sm:p-5" aria-labelledby="hourly-title">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white" id="hourly-title">Hourly forecast</h2>
        <span className="text-xs text-[#8ba3c1]">Next 6 hours</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {hours.map((hour, index) => {
          const Icon = weatherIcons[hour.condition]
          const isCurrentHour = index === 0

          return (
            <article className={`min-w-17 flex-1 rounded-xl px-2 py-3 text-center ${isCurrentHour ? 'bg-[#1d5b91] text-white' : 'text-[#c2d1e3]'}`} key={hour.time}>
              <p className="text-[0.68rem] font-medium">{hour.time}</p>
              <Icon className={`mx-auto my-3 size-5 ${isCurrentHour ? 'text-[#ffd365]' : 'text-[#8dc7ff]'}`} strokeWidth={1.8} aria-hidden="true" />
              <p className="text-sm font-semibold">{hour.temperature}°</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default HourlyForecast
