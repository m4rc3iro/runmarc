import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Comment, CommentType } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments_api_path = '/api/comments';
  env = environment;

  public constructor(private httpClient: HttpClient) { }

  public addComment(comment: Comment, authenticationToken: string): Observable<Comment> {
    let httpOptions = { headers: new HttpHeaders({ 'access-token': authenticationToken })};
    return this.httpClient.post<any>(`${this.env.runmarc_api_base_url}${this.comments_api_path}`, comment, httpOptions);
  }

  public getComments(type: CommentType): Observable<Comment[]> {
    let params = new HttpParams().set('type', type.toString());
    return this.httpClient.get<Comment[]>(`${this.env.runmarc_api_base_url}${this.comments_api_path}`, { params });
  }

}
