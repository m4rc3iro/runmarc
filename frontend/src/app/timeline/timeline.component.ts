import { Component, OnInit, Renderer } from '@angular/core';
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

  races2019 = [
    new Race('100 Miles Of Istria - Blue 110k', new Date('2019-04-12'), "The second largest course offers you “the climb”, right in the beginning, from the sea level directly to the top of the Učka mountain at 1400 m above sea level, all that in just 8 km. Reaching the foot of the mountain peak, the 110 km trail merges with the100 miles trail until Buzet. From Buzet, the trail leads you towards Oprtalj. However, the trail is not as easy as it may seem. You will have to climb twice, cross the stream and you’ll see the ruins of the Pietrapelosa castle. While 110 km with +4.394 m probably doesn’t sound very demanding, it is nevertheless very challenging,  especially if you bear in mind that you will have to cross the mountain during the night.",[
      this.BASE_URL + 'istria2019/IMG_20190411_214920.jpg',
      this.BASE_URL + 'istria2019/57821669_1383567271791904_8269704888426954752_o.jpg',
      this.BASE_URL + 'istria2019/58379212_1383722621776369_5245160129417969664_o.jpg',
      this.BASE_URL + 'istria2019/57852315_1383808708434427_5484173152474890240_o.jpg',
      this.BASE_URL + 'istria2019/58576173_1385716488243649_6564093587577896960_o.jpg',
      this.BASE_URL + 'istria2019/58902317_1385716718243626_4961434186117283840_o.jpg',
      this.BASE_URL + 'istria2019/istria-jingleBells.mov',
      this.BASE_URL + 'istria2019/photo-finish.jpg',
      this.BASE_URL + 'istria2019/IMG_20190414_093954.jpg',
    ])
  ];
  races2018 = [
    new Race('Utmb® - Ccc®', new Date('2018-08-31'), "A race deep into wilderness using for the most the international path 'Grande Randonnée du Tour du Mont-Blanc (GR TMB)'. Mountain race, with numerous passages in high altitude (>2500m), in difficult weather conditions (night, wind, cold, rain or snow), that needs a very good training, adapted equipment and a real capacity of personal autonomy.",[
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
    new Race('Eiger Ultra-Trail® - E101', new Date('2018-07-14'), "Grindelwald holds the honour of hosting the first Ultra Trail race inspired by the myth of the Eiger. The race route passes through the most breath-taking viewpoints in the area; Grosse Scheidegg, First, Bachalpsee, Berghotel Faulhorn, Schynige Platte, Wengen, Männlichen, before traversing the base of the Eiger North Face itself. This Ultra Trail delivers a truly spectacular alpine experience. With a distance of 101km and 6700m height difference, the E101 is a mighty challenge to even the most seasoned of trail runners and the chance of winning the Mountain Prize at the Grosse Scheidegg should help provide a little extra motivation.",[
      this.BASE_URL + 'eiger2018/eiger2018-5-p.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-6.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-10.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-14-p.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-15.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-20.jpg',
      this.BASE_URL + 'eiger2018/eiger2018-25.jpg',
    ]),
    new Race('Transylvania One Hundred - 80K', new Date('2018-05-19'), "Mountain ultra-trail through the wilds of Transylvania, starting and finishing at Dracula's Castle.",[
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
    new Race('Trail Des Fantomes - 48 Km', new Date('2017-08-13'), "",[
      this.BASE_URL + 'phantomes2017/sportograf-105992029.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-106001146.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105971969-p.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105972559.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105984387-p.jpg',
      this.BASE_URL + 'phantomes2017/sportograf-105973836.jpg',
    ]),
    new Race('Trail Vielha-Molieres 3010 - Maratón', new Date('2017-07-15'), "The Vielha-Molières 3010 Marathon is a high mountain race where 5 peaks of more than 2,000 meters are crowned; among them the Molieres of 3010 of height, ceiling of the Valley of Aran and of the race. Two sections of more than 2,400 meters are passed. It has a vertical kilometer hidden in the first 6 kilometers. Much of the race takes place over 2,000 meters, and the start and finish is in Vielha, at 974 meters. Crestas like those of Letassi, alpine meadows in Aubas, magnificent forests like the Baricauba, lakes like the Estanh des Pois, natural spaces like the Artiga de Lin, views of the Aneto from the Tuc de Molières, waterfalls like those of Conangles, rivers, tarteras , ... all that awaits you in this race of pure sky run. There are mountain races, this is a race through the mountains, in the middle of the axial pyrenees. You will feel like a deer or a bear in its habitat. More than 95% of the race are paths and paths. A circular route of the knife style.",[
      this.BASE_URL + 'vielhamolieres2017/IMG_1402.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1409.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1410-p.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1420.JPG',
      this.BASE_URL + 'vielhamolieres2017/IMG_1425-p.JPG',
      this.BASE_URL + 'vielhamolieres2017/video-finish.mp4',
      this.BASE_URL + 'vielhamolieres2017/IMG_1438-p.JPG',
    ]),
    new Race('The North Face Lavaredo Ultra Trail - 120K', new Date('2017-06-23'), "Live the Dolomites experience!",[
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
    new Race('Transgrancanaria Hg - Advanced 82K', new Date('2017-02-25'), "A course designed only for the brave. To complete this type of Transgrancanaria need to be physically fit and experienced mountain racing over long distances. If you have successfully participated in the Transgrancanaria Marathon in the past, this may be for you the next year. The route crosses some of the most outstanding natural scenery of Gran Canaria and it begins at 06:00 in the morning. Several aid stations will welcome the runners, who will enjoy the encouragement of the thousands of people along the course that will come to marvel at your bravery.",[
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
    new Race('Matterhorn Ultraks - 45K', new Date('2016-08-20'), "A magical track! With a concentration of wild space and high mountains, an ideal course requiring one to combine speed and technique, whithout fearing the climb to 3'100m to Gornergrat, offering a panoramic view of the ever present Matterhorn.",[
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
    new Race('Eiger Ultra Trail - E51', new Date('2016-07-16'), "Although aptly named the Panorama Trail, the first ascent towards Grosse Scheidegg should not be underestimated. Once reached, the spectacular scenery along the route to Oberläger via First and Bachalpsee, the 360° panorama atop the Faulhorn summit at 2680m, and the views to the horizon on route to Schynige Platte, definitely compensate for all the effort and remain long in the memory.",[
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_11.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_12.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_15-p.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_16.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_18-p.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_25-p.jpg',
      this.BASE_URL + 'eiger2016/eigerUltraTrail2016_26.jpg',
    ]),
    new Race('Ultra Skymarathon® Madeira - Usm', new Date('2016-06-04'), "The Madeira Sky Race is a mountain technical race with marked gradients 4121 D + and a high technical degree in the slope of Skyrunning.",[
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
    new Race('The Hillary - 34K', new Date('2015-03-14'), "The Trail follows a variety of terrain and scenery – many claim a magical pull of the trail and keep coming back for more. Stunning views throughout the trail, rugged West coast beaches, magnificent native bush including the hundreds of year old native Kauri trees. Past large waterfalls and sand dunes, along cliff tops or through marshlands – there is something for everyone.",[
      this.BASE_URL + 'hillary2015/IMG-20131123-WA0000.jpg',
      this.BASE_URL + 'hillary2015/IMG-20131123-WA0001.jpg',
      this.BASE_URL + 'hillary2015/IMG-20131123-WA0002.jpg',
    ]),
    new Race('Tarawera Ultramarathon - 100K', new Date('2015-02-07'), "The Tarawera 102k is one of the largest, most competitive and international trail running ultra races in the world. Part of the Ultra-Trail World Tour. It is the most international running race in New Zealand with more than 40 countries represented in this race alone and more than half of the field from outside of New Zealand. The 102k is everything that trail ultra running should be – fun, competitive, challenging, scenic, friendly and inspiring.",[
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

  constructor(config: NgbCarouselConfig, private renderer: Renderer) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = true;
  }

  ngOnInit() {}

  closeGallery() {
    this.gallery = false;
  }

  setImageClass(image: string) {
    if (image.includes('-p')) { // tells whether the image should be rendered in (P)ortrait mode or not
      return "carousel-image-portrait";
    } else {
      return "carousel-image-landscape";
    }
  }

  isImage(image: string) {
    if (image.includes('.mp4')  || image.includes('.mpg')  ||
        image.includes('.mpeg') || image.includes('.mov')  || image.includes('.m4v')) {
      return false;
    }
    return true;
  }

}
