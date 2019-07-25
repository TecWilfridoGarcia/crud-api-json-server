import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/users.service';
import { User } from './user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  users: User[] = [];
  user: User[] = [];
  usersList: Observable<User[]>;

  constructor(private service: UserService, private fb: FormBuilder) {

  }

    ngOnInit() {
     this.service.getUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(this.users);
        }
      );
    }
    onSubmit() {
      const newUser = this.userForm.value;
      this.service.postUser(newUser).subscribe(
        user => this.users.push(user)
      );
      console.warn(this.userForm.value);
      if (this.userForm.value === '') {
        return;
      } else {
        alert('Titulo Creado');
      }
      }
      reloadData() {
        this.usersList = this.service.getUsers();
      }
      suppressUser(id) {
        this.service.deleteUser(id).subscribe(
          data => {
            console.log('Eliminado');
            this.reloadData();
          }
        );
      }
      editUser(id) {
        this.service.updateUser(id).subscribe(
          user =>
        this.users.push(id)
        )
      }
}
