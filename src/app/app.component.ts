import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  cityName:string=""
  weather:any=[]
  currentDate: string=""
currentTime: string=""



  constructor(private http:HttpClient, private datePipe: DatePipe){

  }

  ngOnInit(): void {
    const currentDate = this.datePipe.transform(new Date(), 'MMM d yyyy');
    this.currentDate = currentDate || ''; // Assign an empty string if currentDate is null
    
    const currentTime = this.datePipe.transform(new Date(), 'hh:mm a');
    this.currentTime = currentTime || ''; // Assign an empty string if currentTime is null
  }
  
  onCityNameChange(city: string) {
    this.cityName = city; // Update cityName property
    console.log(this.cityName);
    this.getWeather(); // Call getWeather method to fetch weather details
  }

  getImageUrlByTemperature(temperature: number): string {
    if (temperature > 20) {
      return 'https://i.postimg.cc/KzmZ5d71/Weather-Watercolor-Cute-Cloud-Sun-yellow-sun-png-clouds-sun-338429-wh1200-removebg-preview.png';
    } else {
      console.log('COLD');
      
      return 'https://www.pngimages.in/uploads/png-webp/2023/2023-January/snow_Png_Transparent_Images.webp';
    }
  }

  


  getWeather() {
    if (this.cityName.trim() !== '') {
    console.log(this.cityName);
    
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=5b4bee0ba241d092159faf007e166080`)
        .subscribe((data: any) => {
          this.weather = data; // Store the weather data in weather property
          console.log(this.weather);
        }, (error) => {
          console.error('Error fetching weather data:', error);
          // Handle the error and display a user-friendly message
          if (error.status === 404) {
            console.log('City not found. Please enter a valid city name.');
          } else {
            console.log('An unexpected error occurred. Please try again later.');
          }
          this.weather = null; // Reset weather data if there's an error
        });
    } else {
      this.weather = ""; // Reset weather data if cityName is empty
    }
  }
}
