import type { DailyForecastItem, HourlyForecastItem, WeatherCondition, WeatherData } from '../types/weather'

interface GeocodingResult {
  name: string
  country: string
  latitude: number
  longitude: number
}

interface GeocodingResponse {
  results?: GeocodingResult[]
}

interface ForecastResponse {
  timezone: string
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    surface_pressure: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
    visibility: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunrise: string[]
    sunset: string[]
  }
}

const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search'
const forecastUrl = 'https://api.open-meteo.com/v1/forecast'

function getCondition(weatherCode: number): { label: string; type: WeatherCondition } {
  if (weatherCode === 0) return { label: 'Clear sky', type: 'sunny' }
  if (weatherCode <= 3) return { label: 'Partly cloudy', type: 'partly-cloudy' }
  if (weatherCode <= 48) return { label: 'Cloudy', type: 'cloudy' }
  if (weatherCode <= 67 || weatherCode >= 80) return { label: 'Rainy', type: 'rainy' }
  if (weatherCode >= 71 && weatherCode <= 77) return { label: 'Snowy', type: 'snowy' }
  return { label: 'Unsettled', type: 'cloudy' }
}

function formatDay(date: string, index: number): string {
  if (index === 0) return 'Today'

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

function formatHour(date: string, index: number): string {
  if (index === 0) return 'Now'

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
  }).format(new Date(date))
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const geocodingParameters = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json',
  })
  const geocodingResponse = await fetch(`${geocodingUrl}?${geocodingParameters}`)

  if (!geocodingResponse.ok) {
    throw new Error('Could not search for that city.')
  }

  const locationData = (await geocodingResponse.json()) as GeocodingResponse
  const location = locationData.results?.[0]

  if (!location) {
    throw new Error('City not found. Try another city name.')
  }

  const forecastParameters = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure',
    hourly: 'temperature_2m,weather_code,visibility',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
    forecast_days: '7',
    timezone: 'auto',
  })
  const forecastResponse = await fetch(`${forecastUrl}?${forecastParameters}`)

  if (!forecastResponse.ok) {
    throw new Error('Weather information is temporarily unavailable.')
  }

  const forecastData = (await forecastResponse.json()) as ForecastResponse
  const currentCondition = getCondition(forecastData.current.weather_code)
  const currentHourIndex = Math.max(0, forecastData.hourly.time.indexOf(forecastData.current.time))
  const hourlyForecast: HourlyForecastItem[] = forecastData.hourly.time
    .slice(currentHourIndex, currentHourIndex + 6)
    .map((time, index) => {
      const sourceIndex = currentHourIndex + index
      const condition = getCondition(forecastData.hourly.weather_code[sourceIndex])

      return {
        time: formatHour(time, index),
        condition: index === 0 ? currentCondition.type : condition.type,
        temperature: Math.round(forecastData.hourly.temperature_2m[sourceIndex]),
      }
    })
  const dailyForecast: DailyForecastItem[] = forecastData.daily.time.map((date, index) => ({
    day: formatDay(date, index),
    condition: getCondition(forecastData.daily.weather_code[index]).type,
    high: Math.round(forecastData.daily.temperature_2m_max[index]),
    low: Math.round(forecastData.daily.temperature_2m_min[index]),
  }))

  return {
    city: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    temperature: Math.round(forecastData.current.temperature_2m),
    feelsLike: Math.round(forecastData.current.apparent_temperature),
    humidity: forecastData.current.relative_humidity_2m,
    windSpeed: Math.round(forecastData.current.wind_speed_10m),
    visibility: Math.round((forecastData.hourly.visibility[0] ?? 0) / 1000),
    pressure: Math.round(forecastData.current.surface_pressure),
    condition: currentCondition.label,
    hourlyForecast,
    dailyForecast,
  }
}
