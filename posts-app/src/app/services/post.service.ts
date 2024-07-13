import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?_limit=${limit}`);
  }

  // getPosts() {
  //   return throwError(() => new Error('No Posts'));
  // }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
}