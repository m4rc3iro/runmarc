import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Profile } from './profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  env = environment;
  profile_api_path = '/api/admin/profile';

  constructor(private http: HttpClient) {}

  getProfile (): Profile {
    let profile: Profile = new Profile (),
        httpOptions = { headers: new HttpHeaders({ 'authorization': btoa(`${this.env.api_admin_token}`) })};

    this.http.get<string[]>(`${this.env.runmarc_api_base_url}${this.profile_api_path}/info`, httpOptions).subscribe(data => {
      profile.performance.overall = data;
    });

    this.http.get<string[]>(`${this.env.runmarc_api_base_url}${this.profile_api_path}/performance`, httpOptions).subscribe(data => {
      profile.performance.detailed = data;
    });

    this.http.get<any>(`${this.env.runmarc_api_base_url}${this.profile_api_path}/statistics`, httpOptions).subscribe(data => {
      profile.statistics.worldRank = data.worldRank;
      profile.performance.best = data.bestPerformances;
      profile.statistics.other = data.other;
    });

    return profile;
  }

}
