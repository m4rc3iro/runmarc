import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  title = 'runmarc: Intro';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Runmarc, Intro'},
      {name: 'description', content: 'This My Personal Story About Ultra Running in the Shape of Blog Posts, Timeline, Photos and More!'},
      {name: 'robots', content: 'home, intro, ultra, running, experience, history, blog posts, timeline, profile, calendar, feedback'} ]);
  }

}
