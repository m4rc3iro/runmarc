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

  showCommentBox: boolean;
  comments: Comment[];
  author: string = '';
  email: string = '';
  text: string = '';

  // TODO: show comments thanks message.
  public formModel: FormModel = {};
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
    this.shuffleComments();
  }

  onSubmit() {
    this.submitted = true;
  }

  newFeedback () {
    this.commentService.addComment(new Comment(new Date, this.author, this.email, this.text, 0));
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

  shuffleComments(){
    let input = this.comments;
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    this.comments = input;
  }

  getRandomColor() {
    let min = 0,
        max = this.colors.length - 1;
    // return this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
    return 'bittersweet';
  }

}
