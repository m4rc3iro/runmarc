// Import modules and services
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { HttpClient } from '@angular/common/http';
// Class imports
import { Comment } from '../comment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  commentService: CommentService;
  httpClient: HttpClient;

  showCommentBox: boolean;
  comments: Comment[];
  author: string = '';
  email: string = '';
  text: string = '';

  // TODO: show feedback thanks message.
  submitted = false;
  iAmNotARobot = false;

  colors = [
    'default','grapefruit', 'bittersweet', 'sunflower', 'grass', 'mint',
    'aqua', 'bluejeans', 'lavander', 'pinkrose', 'light', 'gray'
  ];

  constructor (httpClient: HttpClient, commentService: CommentService) {
    this.httpClient = httpClient;
    this.commentService = commentService;
    this.comments = this.commentService.getComments();
  }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }

  newFeedback () {
    this.commentService.addComment(new Comment(new Date, this.author, this.email, this.text, 0));
  }

  resolved(captchaResponse: string) {
    let payload = `{"captchaResponse": "${captchaResponse}"}`;
    // verification routed through backend to prevent browser CORS issues
    this.httpClient.post<any>('http://localhost:3000/api/captcha/verify', payload)
              .subscribe(data => {
                // console.log('Google captcha verification response: ' + JSON.stringify(data));
                this.iAmNotARobot = data.success;
              });
  }

  getRandomColor () {
    let min = 0,
        max = this.colors.length - 1;
    // return this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
    return 'bittersweet';
  }

}
