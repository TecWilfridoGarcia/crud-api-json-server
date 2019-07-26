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
    private url = 'http://localhost:3000/users';
  user: User;
  users: User[] = [];
  constructor(private http: HttpClient) { }
  form = new FormGroup({
   id: new FormControl(null),
   title: new FormControl('', Validators.required)
  });

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
      deleteUser(id): Observable<{}> {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    populateForm(user) {
        this.form.setValue(user);
      }

      putUser(user) {
        this.http.put(this.user.id,
          {
            title: user.title,
          });
      }

}
