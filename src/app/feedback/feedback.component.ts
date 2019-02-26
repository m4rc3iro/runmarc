// Import modules and services
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
// Class imports
import { Comment } from '../comment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  colors: string[] = [
    'default','grapefruit', 'bittersweet', 'sunflower', 'grass', 'mint',
    'aqua', 'bluejeans', 'lavander', 'pinkrose', 'light', 'gray'
  ];

  commentService: CommentService;

  showCommentBox: boolean;
  comments: Comment[];

  author: string = '';
  email: string = '';
  text: string = '';

  // TODO: show feedback thanks message.
  submitted = false;


  constructor (commentService: CommentService) {
    this.commentService = commentService;
    this.comments = commentService.getComments();
  }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }

  newFeedback () {
    this.commentService.addComment(new Comment(new Date, this.author, this.email, this.text, 0));
  }

  // onKeyPress (value: string) { this.comment = value; }

  getRandomColor (cColor: boolean) {
    let min = 0,
        max = this.colors.length - 1;
    let color = this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
    return cColor ? 'Cbittersweet' : 'bittersweet';
    // return cColor ? 'C' + color : color;
  }

}
