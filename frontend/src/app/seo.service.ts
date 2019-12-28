import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private metaService: Meta) { }

  generateTags(config) {
    this.titleService.setTitle(config.title);
    
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ name: 'image', content: config.image });
    this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    this.metaService.updateTag({ name: 'robots', content: config.robots });

    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.image });

    this.metaService.updateTag({ name: 'og:title', content: config.title });
    this.metaService.updateTag({ name: 'og:description', content: config.description });
    this.metaService.updateTag({ name: 'og:image', content: config.image });
  }
}
