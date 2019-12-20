import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../comment.service';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentType } from '../comment';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  DEFAULT_RUNMARC_HOME_URL: string = 'http://www.runmarc.io/home%23';
  DEFAULT_TWITTER_SHARE_BASE_URL: string = 'https://twitter.com/intent/tweet?text=';
  DEFAULT_FACEBOOK_SHARE_BASE_URL: string = 'http://facebook.com/sharer.php?u=';

  env = environment;

  // services
  commentService: CommentService;
  httpClient: HttpClient;

  closeResult: string;
  // add comment stuff
  submitted = false; // to show and hide the thanks for your comment message
  iAmNotARobot = false;
  authenticationToken: string;
  active: boolean;
  formModel: FormModel = {};
  author: string = '';
  emailAddress: string = '';
  text: string = '';
  blogPostId: number = 0;

  blogPostNames: string[] = [ 'welcomeToRunmarc', 'istriaStories', 'aFriendsVisit', 'skylineTimes', 'raceUpdates_benNevis2019', 'outro' ];
  blogPostComments: Map<number, Comment[]>;

  constructor(private modalService: NgbModal, httpClient: HttpClient, commentService: CommentService) {
    this.httpClient = httpClient;
    this.commentService = commentService;
  }

  ngOnInit() {
    let localBlogPostComments = JSON.parse(localStorage.getItem('blogPostComments'));

    if(localBlogPostComments && !this.expiredComments(localBlogPostComments.timestamp)){
      this.blogPostComments = new Map(JSON.parse(localBlogPostComments.value));
    } else {
      this.commentService.getComments(CommentType.BlogPost).subscribe((data: Comment[]) => {
        this.blogPostComments = this.parseComments(data); // parse comments data and organise it by blog post
        var object = { value: JSON.stringify(Array.from(this.blogPostComments.entries())),
                       timestamp: new Date().getTime() };
          localStorage.setItem('blogPostComments', JSON.stringify(object));
      });
    }
  }

  openVerticallyCentered(content: string, blogPostId: number) {
    this.blogPostId = blogPostId;
    this.submitted = false;
    this.modalService.open(content, { centered: true });
    return false; // ret false to cancel 'leave your comment' link behavior
  }

  resolved(captchaResponse: string) {
    // If the captcha has expired prior to submitting its value to the server, the component
    // will reset the captcha, and trigger the resolved event with response === null
    if (captchaResponse != null) {
      // verification routed through backend to prevent browser CORS issues
      let payload = JSON.parse(`{"captchaResponse": "${captchaResponse}"}`);
      this.httpClient.post<any>(`${this.env.runmarc_api_base_url}/api/captcha/verify`, payload)
        .subscribe(data => { // console.log('Google captcha verification response: ' + JSON.stringify(data));
          if (data.success) {
            this.iAmNotARobot = true;
            this.authenticationToken = captchaResponse;
          } else {
            this.formModel.captcha = ''; // verification failed, reset captcha (you are a robot)
          }
      });
    }
  }

  addComment() {
    let comment = new Comment(this.author, this.emailAddress, this.text, CommentType.BlogPost, this.blogPostId);
    comment.display = true;

    this.commentService.addComment(comment, this.authenticationToken).subscribe(_data => {
      this.submitted = true;
      localStorage.setItem('commentSubmitted', 'true');
    });
  }

  expiredComments(commentsTimestamp: string) {
    let timeDiff = new Date().getTime() - +commentsTimestamp;
    return timeDiff > 900000 ? true : false; // comments expire after 15 minutes
  }

  parseComments(data: Comment[]): Map<number, Comment[]> {
    let blogPostComments = new Map<number, Comment[]>();

    for(let i = 0; i < data.length; i++) {
      let blogPostId = data[i].blogPostId;
      if(blogPostComments.has(blogPostId)){
        let comments = blogPostComments.get(blogPostId);
        comments.push(data[i]);
      } else {
        blogPostComments.set(blogPostId, [data[i]]);
      }
    }
    return blogPostComments;
  }

  getShareURL(socialNetwork: string, blogPostId: number) {
    switch(socialNetwork) {
      case 'twitter': {
        return this.DEFAULT_TWITTER_SHARE_BASE_URL + this.DEFAULT_RUNMARC_HOME_URL + this.blogPostNames[blogPostId];
      }
      case 'facebook': {
        return this.DEFAULT_FACEBOOK_SHARE_BASE_URL + this.DEFAULT_RUNMARC_HOME_URL + this.blogPostNames[blogPostId];
      }
    }
  }

}
