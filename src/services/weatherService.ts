import type { WeatherData } from '../types/weather'

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
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    surface_pressure: number
  }
  hourly: {
    visibility: number[]
  }
}

const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search'
const forecastUrl = 'https://api.open-meteo.com/v1/forecast'

function getCondition(weatherCode: number): string {
  if (weatherCode === 0) return 'Clear sky'
  if (weatherCode <= 3) return 'Partly cloudy'
  if (weatherCode <= 48) return 'Cloudy'
  if (weatherCode <= 67 || weatherCode >= 80) return 'Rainy'
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snowy'
  return 'Unsettled'
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
    hourly: 'visibility',
    forecast_days: '1',
    timezone: 'auto',
  })
  const forecastResponse = await fetch(`${forecastUrl}?${forecastParameters}`)

  if (!forecastResponse.ok) {
    throw new Error('Weather information is temporarily unavailable.')
  }

  const forecastData = (await forecastResponse.json()) as ForecastResponse

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
    condition: getCondition(forecastData.current.weather_code),
  }
}
