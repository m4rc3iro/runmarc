import { Component, OnInit } from '@angular/core';

import { Race } from './race';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  years = {};
  races = [];
  toggle: boolean = false;

  constructor() { }

  ngOnInit() {
    this.years = {
      2018:true,
      2017:false,
      2016:false,
      2015:false
    };
    this.races = [
      new Race(0, 'Transylvania 80K', new Date('19.05.2018'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the tially unchanged. It was popularised in the 1960s with the release of Letraset sheets."),
      new Race(1, 'Eiger Ultra Trail E51', new Date('13.07.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining e 1960s with the release of Letraset sheets."),
      new Race(2, 'Transgrancanaria 80K', new Date('28.02.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the sheets."),
      new Race(3, 'Matterhorn Ultraks 48K', new Date('22.08.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but als essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."),
      new Race(4, 'Ultra Skymarathon Madeira', new Date('05.06.2016'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."),
    ];
  }

  toggleYear(year: number) {
    this.years = {
      2018:false,
      2017:false,
      2016:false,
      2015:false
    };
    this.years[year] = true;
  }

  showHideYearContent(year: number){
    return {'display': this.years[year] ? 'block' : 'none'};
  }

}
