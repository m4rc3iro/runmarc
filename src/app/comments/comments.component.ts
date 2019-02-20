import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentsColors: string[] = ['#a8e6cf','#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'];
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
