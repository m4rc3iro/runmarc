// Import modules
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Import classes
import { InfoData } from './profile';
import { PerformanceData } from './profile';
import { StatisticsData } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  aboutMeData: any;
  performanceGeneralData: string[] = [];
  performanceDetailedData: string[] = [];
  worldRankData:  string[] = [];
  bestPerformancesData:  string[] = [];
  otherData:  string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<InfoData>("http://localhost:8000/api/profile/info")
      .subscribe(data => {
        this.aboutMeData = data.aboutMeData;
        this.performanceGeneralData = data.performanceData;
        // console.log(data);
      });

    this.http.get<PerformanceData>("http://localhost:8000/api/profile/performance")
      .subscribe(data => {
        this.performanceDetailedData = data.performanceData;
        // console.log(data);
      });

    this.http.get<StatisticsData>("http://localhost:8000/api/profile/statistics")
      .subscribe(data => {
        this.worldRankData = data.worldRankData;
        this.bestPerformancesData = data.bestPerformancesData;
        this.otherData = data.otherData;
        // console.log(data);
      });

  }

}
