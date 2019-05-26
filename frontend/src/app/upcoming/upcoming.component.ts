import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  events = [
    { name: 'Jokertrail 50K',             country: 'Heidelberg, Germany' },
    { name: 'Heidelberg Halbmarathon',    country: 'Heidelberg, Germany' },
    { name: 'Istria Ultra Trail',         country: 'Istria, Croatia' },
    { name: 'Cortina Trail',              country: 'Cortina d\'Ampezzo, Italy' },
    { name: 'Andorra Ultra Trail',        country: 'Andorra, Spain' },
    { name: 'Ben Navis Ultra',            country: 'Kinlochleven, Scotland' },
    { name: 'Ultra Pirineu',              country: 'Catalonia, Spain' } ];

  selectedEvent: string;
  selectedCountry: string;

  constructor() {}
  ngOnInit() {}

  toggleTooltip(tooltip, event) {
    this.selectedEvent = this.events[event - 1].name;
    this.selectedCountry = this.events[event - 1].country;
    // tooltip.toggle();
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open();
    }
  }

}
