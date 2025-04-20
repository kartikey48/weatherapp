export interface WeatherData {
    location: {
      name: string;
      region: string;
      country: string;
    };
    current: {
      feelslike_c:number;
      temp_c: number;
      humidity:number;
      gust_mph:number;
      condition: {
        text: string;
        icon: string;
        
      };
    };
  }
  