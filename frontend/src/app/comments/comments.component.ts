import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentType } from '../comment';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  env = environment;

  commentService: CommentService;
  httpClient: HttpClient;

  comments: Comment[];

  // new comment form stuff
  active: boolean;
  formModel: FormModel = {};
  author: string = '';
  emailAddress: string = '';
  text: string = '';

  submitted = false; // to show and hide the thanks for your comment message
  iAmNotARobot = false;
  authenticationToken: string;

  colors = [
    'default','grapefruit', 'bittersweet', 'sunflower', 'grass', 'mint',
    'aqua', 'bluejeans', 'lavander', 'pinkrose', 'light', 'gray'
  ];

  constructor (httpClient: HttpClient, commentService: CommentService) {
    this.httpClient = httpClient;
    this.commentService = commentService;
  }

  ngOnInit() {
    let localComments = JSON.parse(localStorage.getItem('comments'));

    if(localComments && !this.expiredComments(localComments.timestamp)){
      this.comments = <Comment[]>localComments.value;
      this.comments = this.shuffleComments(this.comments);
      // make sure only one comment can be sent per user session
      this.submitted = JSON.parse(localStorage.getItem('commentSubmitted'));
    } else {
        this.commentService.getComments(CommentType.Feedback).subscribe((data: Comment[]) => {
        this.comments = this.shuffleComments(data);
        var object = { value: data,
                       timestamp: new Date().getTime() };
        localStorage.setItem('comments', JSON.stringify(object));
        this.submitted = false; // reset if comments cache is expired
      });
    }
  }

  expiredComments(commentsTimestamp: string) {
    let timeDiff = new Date().getTime() - +commentsTimestamp;
    return timeDiff > 900000 ? true : false; // comments expire after 15 minutes
  }

  addComment() {
    let comment = new Comment(this.author, this.emailAddress, this.text, CommentType.Feedback);
    this.commentService.addComment(comment, this.authenticationToken).subscribe(_data => {
      this.submitted = true;
      localStorage.setItem('commentSubmitted', 'true');
    });
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

  shuffleComments(comments: Comment[]): Comment[] {
    let input = comments
    if (comments && comments.length > 0) {
      for (let i = comments.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
    }
    return input;
  }
}
