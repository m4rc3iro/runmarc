// Import modules and services
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
// class imports
import { Profile } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  MY_BIRTH_DATE: string = '1984-06-21';

  age: number;
  profile: Profile;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.age = this.calculateAge();
    // Enable to retrieve data from ITRA website using API
    // this.profile = this.profileService.getProfile();
  }

  calculateAge(): number {
    var timeDiff = Math.abs(Date.now() - new Date(this.MY_BIRTH_DATE).getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  }

}
