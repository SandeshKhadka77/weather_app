import { Droplets, Eye, Gauge, Wind } from 'lucide-react'

interface WeatherDetailsProps {
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
}

const metrics = [
  { label: 'Humidity', icon: Droplets, value: 'humidity' },
  { label: 'Wind', icon: Wind, value: 'windSpeed' },
  { label: 'Visibility', icon: Eye, value: 'visibility' },
  { label: 'Pressure', icon: Gauge, value: 'pressure' },
] as const

function WeatherDetails({
  humidity,
  windSpeed,
  visibility,
  pressure,
}: WeatherDetailsProps) {
  const values = {
    humidity: `${humidity}%`,
    windSpeed: `${windSpeed} km/h`,
    visibility: `${visibility} km`,
    pressure: `${pressure} hPa`,
  }

  return (
    <section className="grid min-w-0 grid-cols-2 divide-x divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#12294a] sm:grid-cols-4 sm:divide-y-0" aria-label="Weather details">
      {metrics.map((metric) => {
        const Icon = metric.icon

        return (
          <div className="flex items-center gap-3 px-4 py-4 sm:px-5" key={metric.label}>
            <Icon className="size-4 text-[#66b7ff]" strokeWidth={1.8} aria-hidden="true" />
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#8ba3c1]">{metric.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{values[metric.value]}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default WeatherDetails
