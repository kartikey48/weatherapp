"use server"
import { WeatherData } from "@/types/weather";
import { z } from "zod";

const weatherSchema = z.object({
    location: z.object({
      name: z.string(),
      region: z.string(),
      country: z.string(),
    }),
    current: z.object({
      feelslike_c: z.number(),
      temp_c: z.number(),
      humidity: z.number(),
      gust_mph: z.number(),
      condition: z.object({
        text: z.string(),
        icon: z.string(),
      }),
    }),
  });

export async function getWeatherData(city:string): Promise<{
    data?: WeatherData
    error?: string
}> {
    try{
if(!city.trim()){
    return {error: 'City name is required.'};
}

        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.OPENWEATHERMAP_API_KEY}
            &q=${city}`);

        if (!res.ok) {
            throw new Error("City not found");
        }
    const rawData = await res.json();
    const data = weatherSchema.parse(rawData);
    return { data };
    } catch (error){
      if(error instanceof z.ZodError){
        return{ error: " Invalid weather data recived"}
      }
      return {
        error: error instanceof Error ? error.message : "Failed to fetch weather data"
      }
    }
}