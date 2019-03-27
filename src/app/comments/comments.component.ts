// Import modules and services
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { HttpClient } from '@angular/common/http';
// Class imports
import { Comment } from '../comment';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentService: CommentService;
  httpClient: HttpClient;

  comments: Comment[];

  formModel: FormModel = {};
  author: string = '';
  emailAddress: string = '';
  text: string = '';

  submitted = false;
  iAmNotARobot = false;

  colors = [
    'default','grapefruit', 'bittersweet', 'sunflower', 'grass', 'mint',
    'aqua', 'bluejeans', 'lavander', 'pinkrose', 'light', 'gray'
  ];

  constructor (httpClient: HttpClient, commentService: CommentService) {
    this.httpClient = httpClient;
    this.commentService = commentService;
  }

  ngOnInit() {
    let localComments = localStorage.getItem('comments');
    if(localComments && localComments.indexOf('Error') == -1){
      this.comments = this.parseComments(localComments);
      this.comments = this.shuffleComments(this.comments);
    } else {
      this.commentService.getComments().subscribe((data: Comment[]) => this.processData(data) );
    }
  }

  ngOnDestroy() { localStorage.removeItem('comments'); }

  onSubmit() {
    this.submitted = true;
  }

  addComment() {
    let comment = new Comment();
    comment.date = new Date();
    comment.author = this.author;
    comment.email = this.emailAddress;
    comment.text = this.text;

    this.commentService.addComment(comment);
  }

  resolved(captchaResponse: string) {
    // If the captcha has expired prior to submitting its value to the server, the component
    // will reset the captcha, and trigger the resolved event with response === null
    if (captchaResponse != null) {
      // verification routed through backend to prevent browser CORS issues
      let payload = `{"captchaResponse": "${captchaResponse}"}`;
      this.httpClient.post<any>('http://localhost:3000/api/captcha/verify', payload)
          .subscribe(data => {
            // console.log('Google captcha verification response: ' + JSON.stringify(data));
            if (data.success) {
              this.iAmNotARobot = true;
            } else {
              this.formModel.captcha = ''; // reset captcha, you are a robot
            }
          });
    }
  }

  processData(data: Comment[]) {
    this.comments = this.shuffleComments(data);
    localStorage.setItem('comments', JSON.stringify(data));
  }

  parseComments(comments: string) {
    // type assertion to convert data types
    let commentsObject: Array<Comment> = JSON.parse(comments);
    return commentsObject;
  }

  shuffleComments(comments: Comment[]): Comment[] {
    let input = comments;
    if (comments && comments.length > 0) {
      for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
    }
    return input;
  }

}
