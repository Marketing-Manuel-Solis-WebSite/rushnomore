'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Thermometer } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: string;
}

const MOCK_WEATHER: WeatherData = {
  temp: 72,
  condition: 'Partly Cloudy',
  humidity: 35,
  wind: 8,
  icon: 'partly-cloudy',
};

function WeatherIcon({ condition, className }: { condition: string; className?: string }) {
  const c = condition.toLowerCase();
  if (c.includes('rain') || c.includes('shower')) return <CloudRain className={className} />;
  if (c.includes('snow')) return <Snowflake className={className} />;
  if (c.includes('cloud') || c.includes('overcast')) return <Cloud className={className} />;
  if (c.includes('wind')) return <Wind className={className} />;
  return <Sun className={className} />;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER);

  // Using mock data for now - can integrate real API later
  useEffect(() => {
    // Simulate slight variation for realism
    const temps = [68, 70, 72, 74, 76, 65, 78];
    const conditions = ['Sunny', 'Partly Cloudy', 'Clear', 'Mostly Sunny'];
    setWeather({
      temp: temps[new Date().getDay()],
      condition: conditions[new Date().getDay() % conditions.length],
      humidity: 30 + (new Date().getDay() * 3),
      wind: 5 + new Date().getDay(),
      icon: 'sunny',
    });
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <WeatherIcon condition={weather.condition} className="w-4 h-4 text-brand-gold" />
      <span className="font-semibold">{weather.temp}°F</span>
      <span className="text-white/50 hidden xl:inline">Sturgis</span>
    </div>
  );
}

export function WeatherBanner() {
  const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER);

  useEffect(() => {
    const temps = [68, 70, 72, 74, 76, 65, 78];
    const conditions = ['Sunny', 'Partly Cloudy', 'Clear', 'Mostly Sunny'];
    setWeather({
      temp: temps[new Date().getDay()],
      condition: conditions[new Date().getDay() % conditions.length],
      humidity: 30 + (new Date().getDay() * 3),
      wind: 5 + new Date().getDay(),
      icon: 'sunny',
    });
  }, []);

  return (
    <div className="glass-gold rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
        <WeatherIcon condition={weather.condition} className="w-6 h-6 text-brand-gold" />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-brand-navy">{weather.temp}°F</span>
          <span className="text-brand-stone text-sm">{weather.condition}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-brand-stone mt-1">
          <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" />Humidity: {weather.humidity}%</span>
          <span className="flex items-center gap-1"><Wind className="w-3 h-3" />Wind: {weather.wind} mph</span>
        </div>
      </div>
      <div className="ml-auto text-right hidden sm:block">
        <p className="text-xs text-brand-stone">Current weather in</p>
        <p className="text-sm font-bold text-brand-navy">Sturgis, SD</p>
      </div>
    </div>
  );
}
