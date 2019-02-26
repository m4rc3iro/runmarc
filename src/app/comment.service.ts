// module imports
import { Injectable } from '@angular/core';
// class imports
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Comment[];

  constructor() {
    this.comments = [
      new Comment(new Date(), 'Marc Supastar', 'blah@hotmail.com', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 2),
      new Comment(new Date(), 'Ivana 66', 'blah@hotmail.com', 'This is a sweet test 2', 2),
      new Comment(new Date(), 'Olga Eiro', 'blah@hotmail.com', "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.", 12),
      new Comment(new Date(), 'allows333', 'blah@hotmail.com', 'This is a sweet test 4', 22),
      new Comment(new Date(), 'written Ignacio', 'blah@hotmail.com', 'This is a sweet test 5', 6),
      new Comment(new Date(), 'express NTM', 'blah@hotmail.com', 'This is a sweet test 6', 8),
      new Comment(new Date(), 'Micheal Jackson', 'blah@hotmail.com', 'This is a sweet test 7', 9),
    ];
  }

  addComment(comment: Comment): boolean {
    // console.log(JSON.stringify(comment));
    this.comments.push(comment);
    return true;
  }

  getComments(): Comment[] {
    return this.comments;
  }
}
