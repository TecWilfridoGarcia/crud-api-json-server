import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/users/user';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable <User[]> {
    const httpHeaders = new HttpHeaders ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer validToke.'
      });
    return this.http.get<User[]>(this.url, { headers: httpHeaders });
     }
     postUser(user: User): Observable<User[]> {
        return this.http.post<User[]>(this.url, user);
      }
}
