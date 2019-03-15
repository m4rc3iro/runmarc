import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public constructor(private httpClient: HttpClient) { }

  public addComment(comment: Comment) {
    this.httpClient.post<any>('http://localhost:3000/api/comments', comment)
      .subscribe(data => {
        // console.log(JSON.stringify(data));
    });
  }

  public getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>("http://localhost:3000/api/comments");
  }

  // *******************************************************************
  // ********************  Private methods  ****************************
  // *******************************************************************


}
