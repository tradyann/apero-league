import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  jsonData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchJsonData();
  }

  fetchJsonData() {
    this.http.get<any>('assets/thisweek.json').subscribe(data => {
      console.log('JSON data:', data);
      this.jsonData = data;
    });
  }

  getTimeFormatted(seconds: number): string {
    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000;
    // Create a new Date object
    const date = new Date(milliseconds);
    // Get hours, minutes, and seconds from the Date object
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondsRemaining = date.getUTCSeconds();
  
    // Check if the time is less than 60 minutes
    if (hours === 0 && minutes < 60) {
      // If yes, format the time as MM:SS
      return `${this.pad(minutes)}:${this.pad(secondsRemaining)}`;
    } else {
      // Otherwise, format the time as HH:MM:SS
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secondsRemaining)}`;
    }
  }
  
  pad(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }

}
