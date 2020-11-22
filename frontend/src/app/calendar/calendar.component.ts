import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events = [
    { name: 'Skyrace Comapedrosa 21K', country: 'Andorra, Spain' },
    { name: 'Mont Blanc 90K', country: 'Chamonix, France' },
  ];

  selectedEvent: string;
  selectedCountry: string;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.generateTags({
      title: 'runmarc: Calendar',
      description: 'Race Calendar with some of the Scheduled Yearly Participations',
      image: '../../assets/logo-solo-red.png',
      keywords: 'Runmarc, Calendar, Events, Races',
      robots: 'calendar, races, events' });
  }

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
