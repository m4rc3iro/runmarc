import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments_api_path = '/api/comments';
  env = environment;

  public constructor(private httpClient: HttpClient) { }

  public addComment(comment: Comment) {
    this.httpClient.post<any>(`${this.env.runmarc_api_base_url}${this.comments_api_path}`, comment)
      .subscribe(data => { /* console.log(JSON.stringify(data)); */ });
  }

  public getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.env.runmarc_api_base_url}${this.comments_api_path}`);
  }

}
