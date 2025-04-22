"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./actions";
import { WeatherData } from '../types/weather';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";


function Submitbutton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Search className={` w-4 h-4 ${pending ? "animate-spin" : ""} `}/>
    </Button>
  )
}


export default function Home() {
const [weather, setWeather] = useState<WeatherData| null>(null);
const [error , setError] = useState<string>("")
const handleSearch = async (formData: FormData) =>{

  setError("");
  const city = formData.get("city") as string ;
  const { data, error : weatherError } = await getWeatherData(city)
  console.log(error)
  
if(weatherError){
  setError(weatherError);
  setWeather(null);
}

  if(data) {
    setWeather(data);
  }
  
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500
    p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2">
           <Input
              name="city"
              type="text"
              placeholder="Enter city name"
              className="bg-gray-100 p-2 rounded-md"
              required
           />
           <Submitbutton />
        </form>

        {error && (
          <motion.div
          initial={{ opacity: 0, y:10 }}
          animate={{ opacity: 1, y:0 }}
          exit={{opacity: 0}}
          transition={{ duration: 0.5 }}
           className="text-center bg-white/50 backdrop:blur ">{error}
          </motion.div>
        )} 

        {weather && (
          <motion.div 
          initial={{ opacity: 0 , y:20}}
          animate={{ opacity: 1 , y:0}}
          transition={{ duration: 0.5 }}
          exit={{opacity: 0}}
          className="text-center mb-4">
            <Card className="bg-white/70 backdrop-blur">
              <CardContent className="p-6">
                <motion.h2 
                initial={{scale:0.5}}
                animate={{scale:1}}
                className="text-2xl font-bold">{weather.location.name}</motion.h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <img 
                   src={`https:${weather.current.condition.icon}`}
                  alt="weather icon"
                  width={90}
                  height={90}
                  />
                  <div className="text-5xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
                </div>
                <div className="text-gray-500 mt-1 capitalize">{weather.current.condition.text}</div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <motion.div 
                   whileHover={{scale: 1.05}}
                  className="text-center">
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500"/>
                    <div className="mt-2 text-sm text-gray-500">Feels like</div>
                    <div className="font-semibold">
                      {Math.round(weather.current.feelslike_c)}°C
                      </div>
                    </motion.div>
                  <motion.div 
                   whileHover={{scale: 1.05}}
                  className="text-center">
                    <Droplet className="w-6 h-6 mx-auto text-blue-500"/>
                    <div className="mt-2 text-sm text-gray-500">humidity</div>
                    <div className="font-semibold">
                      {Math.round(weather.current.humidity)}%
                    </div>
                  </motion.div>
                  <motion.div 
                   whileHover={{scale: 1.05}}
                  className="text-center">
                    <Wind className="w-6 h-6 mx-auto text-teal-500"/>
                    <div className="mt-2 text-sm text-gray-500">Wind</div>
                    <div className="font-semibold">
                      {Math.round(weather.current.gust_mph)} m/s
                        </div>
                      </motion.div>
                   
                </div>
              </CardContent>

            </Card>
          </motion.div>

        )}
      </div>
    </div>
  );
}
