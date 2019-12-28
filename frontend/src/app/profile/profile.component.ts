import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Title, Meta } from '@angular/platform-browser';

import { Profile } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  MY_BIRTH_DATE: string = '1984-06-21';

  title = 'runmarc: Profile';

  age: number;
  profile: Profile;

  constructor(private profileService: ProfileService, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Runmarc, Profile, ITRA'},
      {name: 'description', content: 'ITRA Profile with Summary of Most Distinctive Events and Results Achieved Until Now'},
      {name: 'robots', content: 'itra, profile, races, events, qualifications, times'} ]);

    this.age = this.calculateAge();
    // Enable to retrieve data from ITRA website using API
    // this.profile = this.profileService.getProfile();
  }

  calculateAge(): number {
    var timeDiff = Math.abs(Date.now() - new Date(this.MY_BIRTH_DATE).getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  }

}
