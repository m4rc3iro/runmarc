import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackColors: string[] = ['#a8e6cf','#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'];
  showCommentBox: boolean;
  newComment: string = '';


  constructor() {
  }

  ngOnInit() {
  }

  onKeyPress(value: string) {
    this.newComment = value;
  }

}
