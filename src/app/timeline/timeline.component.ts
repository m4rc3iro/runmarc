import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { Race } from './race';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [NgbCarouselConfig]
})
export class TimelineComponent implements OnInit {

  gallery: boolean;
  raceSelected: Race;

  races2018 = [
    new Race('Utmb® - Ccc®', new Date('08.31.2018'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      '/assets/lavaredo/north-face-lavaredo-ultra-trail-2017-1.jpg',
      '/assets/lavaredo/north-face-lavaredo-ultra-trail-2017-2.jpg',
      '/assets/lavaredo/north-face-lavaredo-ultra-trail-2017-3.jpg',
      '/assets/lavaredo/north-face-lavaredo-ultra-trail-2017-4.jpg'
    ]),
    new Race('Eiger Ultra-Trail® - E101', new Date('07.14.2018'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[]),
    new Race('Transylvania One Hundred - 80K', new Date('05.19.2018'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[])
  ];

  races2017 = [
    new Race('Trail Des Fantomes - 48 Km', new Date('08.13.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[]),
    new Race('Trail Vielha-Molieres 3010 - Maratón', new Date('07.15.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[]),
    new Race('The North Face Lavaredo Ultra Trail - 120K', new Date('06.23.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the sheets.",[]),
    new Race('Transgrancanaria Hg - Advanced 82K', new Date('02.25.2017'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[])
  ];

  races2016 = [
    new Race('Matterhorn Ultraks - 45K', new Date('08.20.2016'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining e 1960s with the release of Letraset sheets.",[]),
    new Race('Eiger Ultra Trail - E51', new Date('07.16.2016'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[]),
    new Race('Ultra Skymarathon® Madeira - Usm', new Date('06.04.2016'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. also the leap into electronic typesetting, It was popularised in the 1960s with the release of Letraset sheets.",[])
  ];

  races2015 = [
    new Race('The Hillary - 34K', new Date('03.14.2015'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[]),
    new Race('Tarawera Ultramarathon - 100K', new Date('02.07.2015'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and sc",[])
  ];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 60000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit() {
  }

}
