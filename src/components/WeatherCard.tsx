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
    <section className="rounded-lg border border-[#d7e3dc] bg-white p-5 sm:p-7" aria-labelledby="current-weather-title">
      <div className="flex justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#f07c62]">Current weather</p>
          <h2 className="mb-1.5 text-[1.45rem]" id="current-weather-title">
            {city}, {country}
          </h2>
          <p className="text-[#5c7373]">{condition}</p>
        </div>
        <span className="text-[3.4rem] leading-none" role="img" aria-label={condition}>
          ☀
        </span>
      </div>

      <div className="my-9 flex items-end justify-between">
        <strong className="text-[4.5rem] leading-[0.9]">{temperature}°</strong>
        <span className="text-sm text-[#5c7373]">Feels like {feelsLike}°</span>
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <div className="border-t border-[#d7e3dc] pt-3.5">
          <dt className="text-xs text-[#5c7373]">Humidity</dt>
          <dd className="mt-1 font-bold">{humidity}%</dd>
        </div>
        <div className="border-t border-[#d7e3dc] pt-3.5">
          <dt className="text-xs text-[#5c7373]">Wind</dt>
          <dd className="mt-1 font-bold">{windSpeed} km/h</dd>
        </div>
      </dl>
    </section>
  )
}

export default WeatherCard
