import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/users/user';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000/users';
  user: User;
  users: User[] = [];
  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required)
  });


  getUsers(): Observable<User[]> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer validToke.'
    });
    return this.http.get<User[]>(this.url, { headers: httpHeaders });
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  postUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.url, user);
  }
  deleteUser(id): Observable<{}> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  populateForm(user) {
    this.form.setValue(user);
  }

  // putUser(user: User): Observable<User> {
  //   return this.http.put<User>(this.url, user);
  // }
  putUser(user: User) {
    return this.http.put(this.url + '/' + user.id, user);
  }
  searchTitle(termino: string) {
    const nombreArr: User[] = [];
    // termino = termino.toLowerCase();

    for (const user of this.users) {
      const title: string = user.title.toLocaleLowerCase();
      if (title.indexOf(termino) !== 1) {
        nombreArr.push(user);
      }
    }

  }
}
