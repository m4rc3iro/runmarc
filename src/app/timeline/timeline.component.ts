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

  BASE_URL: string = 'https://s3.eu-west-2.amazonaws.com/runmarc.io/timeline/';

  gallery: boolean;
  raceSelected: Race;

  races2018 = [
    new Race('Utmb® - Ccc®', new Date('2018-08-31'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      // 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
      this.BASE_URL + 'ccc2018/IMG_3957.jpg',
      this.BASE_URL + 'ccc2018/IMG_3960.jpg',
      this.BASE_URL + 'ccc2018/IMG_3962.jpg',
      this.BASE_URL + 'ccc2018/46891738.jpg',
      this.BASE_URL + 'ccc2018/IMG_3968.jpg',
      this.BASE_URL + 'ccc2018/46897374-p.jpg',
      this.BASE_URL + 'ccc2018/IMG_3970.jpg',
      this.BASE_URL + 'ccc2018/IMG_3971.jpg',
      this.BASE_URL + 'ccc2018/IMG_3978.jpg',
      this.BASE_URL + 'ccc2018/IMG_3980.jpg'
    ]),
    new Race('Eiger Ultra-Trail® - E101', new Date('2018-07-14'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      this.BASE_URL + 'eiger2018/eiger2018-5-p.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-6.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-10.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-14-p.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-15.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-20.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-25.jpg',
    ]),
    new Race('Transylvania One Hundred - 80K', new Date('2018-05-19'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      this.BASE_URL + 'transylvania2018/transylvania-499.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-500.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-501.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-503.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-505.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-506.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-507.jpg',
      this.BASE_URL + 'transylvania2018/transylvania-509.jpg',
    ])
  ];

  races2017 = [
    new Race('Trail Des Fantomes - 48 Km', new Date('2017-08-13'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      this.BASE_URL + 'phantomes2017/sportograf-105992029.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-106001146.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105971969-p.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105972559.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105984387-p.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105973836.jpg',
    ]),
    new Race('Trail Vielha-Molieres 3010 - Maratón', new Date('2017-07-15'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      this.BASE_URL + 'vielhamolieres2017/IMG_1402.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1409.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1410-p.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1420.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1425-p.JPG',
      this.BASE_URL + 'vielhamolieres2017/video-finish.mp4',
      this.BASE_URL + 'vielhamolieres2017/IMG_1438-p.JPG',
    ]),
    new Race('The North Face Lavaredo Ultra Trail - 120K', new Date('2017-06-23'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the sheets.",[
      this.BASE_URL + 'lut2017/IMG_1057.JPG',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-3948.jpg',
      this.BASE_URL + 'lut2017/IMG_1115.JPG',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-609.jpg',
      this.BASE_URL + 'lut2017/IMG_1126-p.JPG',
      this.BASE_URL + 'lut2017/IMG_1105.JPG',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-1544.jpg',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-586.jpg',
      this.BASE_URL + 'lut2017/IMG_1113.JPG',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-681.jpg',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-4764.jpg',
      this.BASE_URL + 'lut2017/IMG_1110.JPG',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-4768.jpg',
      this.BASE_URL + 'lut2017/north-face-lavaredo-ultra-trail-2017-4770-p.jpg',
      this.BASE_URL + 'lut2017/video-finish.mp4',
    ]),
    new Race('Transgrancanaria Hg - Advanced 82K', new Date('2017-02-25'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-01.jpg',
      this.BASE_URL + 'transgrancanaria2017/Photo 25.02.17-59-p.jpg',
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-23.jpg',
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-24.jpg',
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-28.jpg',
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-30.jpg',
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-39.jpg',
      this.BASE_URL + 'transgrancanaria2017/Screenshot 2019-02-11-47.jpg',
      this.BASE_URL + 'transgrancanaria2017/Photo 25.02.17-39.jpg',
    ])
  ];

  races2016 = [
    new Race('Matterhorn Ultraks - 45K', new Date('2016-08-20'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining e 1960s with the release of Letraset sheets.",[
      this.BASE_URL + 'ultraks2016/ultraks-0610.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-0611.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-0614.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-0615.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-3320-p.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-0618.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-3321.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-0616.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-0617.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-3323.jpg',
      this.BASE_URL + 'ultraks2016/ultraks-3325.jpg',
    ]),
    new Race('Eiger Ultra Trail - E51', new Date('2016-07-16'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_11.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_12.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_15-p.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_16.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_18-p.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_25-p.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_26.jpg',
    ]),
    new Race('Ultra Skymarathon® Madeira - Usm', new Date('2016-06-04'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. also the leap into electronic typesetting, It was popularised in the 1960s with the release of Letraset sheets.",[
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-59.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-58.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-29.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-57.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-48.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-47.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-26.jpg',
      this.BASE_URL + 'usm2016/Screenshot 2019-02-11-54.jpg',
    ])
  ];

  races2015 = [
    new Race('The Hillary - 34K', new Date('2015-03-14'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",[
      // this.BASE_URL + 'hillary2015/',
      // this.BASE_URL + 'hillary2015/',
      // this.BASE_URL + 'hillary2015/',
    ]),
    new Race('Tarawera Ultramarathon - 100K', new Date('2015-02-07'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and sc",[
      this.BASE_URL + 'tarawera2015/tarawera-19.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-20-p.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-24.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-25.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-26-p.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-27.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-40.jpg',
      this.BASE_URL + 'tarawera2015/tarawera-43.jpg',
    ])
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = true;
  }

  ngOnInit() {
  }

  setImageClass(image: string) {
    if (image.includes('-p')) { // tells whether the image should be rendered in (P)ortrait mode or not
      return "carousel-image-portrait";
    } else {
      return "carousel-image-landscape";
    }
  }

  isImage(image: string) {
    if (image.includes('.mp4')  ||
        image.includes('.mpg')  ||
        image.includes('.mpeg') ||
        image.includes('.m4v')) {
      return false;
    } else {
      return true;
    }
  }

}
