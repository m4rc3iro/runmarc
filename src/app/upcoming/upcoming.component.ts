import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  // expand0: boolean;
  // expand1: boolean;
  // expand2: boolean;

  event: string;
  country: string;
  website: string;
  popoverTitle: string = 'Event Details';

  events = [{
            event: 'Transylvania100 80K',
            country: 'Romania'
          }, {
            event: 'Eiger Ultra Trail E101',
            country: 'Switzerland'
          }, {
            event: 'UTMB CCC',
            country: 'France'
          }];

  constructor() {
  }

  ngOnInit() {

  }

  toggleWithGreeting(tooltip, event: string, country: string, website: string) {
    this.event = event;
    this.country = country;

    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open();
    }
  }

}
