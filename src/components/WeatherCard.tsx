import { CloudSun, MapPin } from 'lucide-react'
import skyImage from '../assets/kathmandu-sky.jpg'

interface WeatherCardProps {
  city: string
  country: string
  temperature: number
  condition: string
  feelsLike: number
}

function WeatherCard({
  city,
  country,
  temperature,
  condition,
  feelsLike,
}: WeatherCardProps) {
  return (
    <section className="relative min-h-71.25 overflow-hidden rounded-2xl border border-white/10 bg-[#17385e] p-5 sm:p-7" aria-labelledby="current-weather-title">
      <img className="absolute inset-0 size-full object-cover opacity-45" src={skyImage} alt="Mountain landscape beneath a blue sky" />
      <div className="absolute inset-0 bg-linear-to-r from-[#102544] via-[#17385e]/80 to-transparent" aria-hidden="true" />
      <div className="relative flex justify-between gap-4">
        <div>
          <p className="mb-3 flex items-center gap-1.5 text-xs text-[#c2d1e3]"><MapPin className="size-3.5 text-[#66b7ff]" /> Current weather</p>
          <h2 className="mb-1.5 text-2xl font-bold text-white" id="current-weather-title">
            {city}, {country}
          </h2>
          <p className="text-sm text-[#c2d1e3]">Nepal</p>
        </div>
        <span className="rounded-full bg-white/10 p-3 text-[#ffd365]" role="img" aria-label={condition}>
          <CloudSun className="size-8" strokeWidth={1.5} />
        </span>
      </div>

      <div className="relative my-8 flex items-end gap-3">
        <strong className="text-7xl font-medium leading-[0.85] tracking-[-0.04em] text-white sm:text-8xl">{temperature}°</strong>
        <span className="pb-1 text-2xl text-[#c2d1e3]">C</span>
      </div>

      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#c2d1e3]">
        <span className="font-medium text-white">{condition}</span>
        <span>Feels like {feelsLike}°</span>
        <span>H: 26°</span>
        <span>L: 16°</span>
      </div>
    </section>
  )
}

export default WeatherCard
