// module imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// class imports
import { Profile } from './profile/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile (): Profile {
    let profile: Profile = new Profile ();

    this.http.get<string[]>("http://localhost:8000/api/profile/info")
    .subscribe(data => {
      profile.performance.overall = data;
    });

    this.http.get<string[]>("http://localhost:8000/api/profile/performance")
    .subscribe(data => {
      profile.performance.detailed = data;
    });

    this.http.get<any>("http://localhost:8000/api/profile/statistics")
    .subscribe(data => {
      profile.statistics.worldRank = data.worldRank;
      profile.performance.best = data.bestPerformances;
      profile.statistics.other = data.other;
    });

    console.log(profile);
    return profile;
  }

}
