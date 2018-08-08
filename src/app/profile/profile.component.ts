import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // performanceGeneral: string[];
  performanceDetail: string[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Profile>("http://localhost:8000/api/profile")
      .subscribe(data => {
        this.performanceDetail = data.performanceDetail;
        console.log(this.performanceDetail);
      });
  }

}
