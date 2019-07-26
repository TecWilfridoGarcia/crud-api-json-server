import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
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

    onSubmit(user: NgForm) {
      if (user == null) {
        this.postUser(user);
      } else {
        this.updateUser(user);
      }
    }

    postUser() {
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
      resetForm(user?: NgForm) {
        if (user != null) {
          user.resetForm();
        }
        this.service.user = {
         id: null,
          title: ''
        };
      }
      updateUser(user: NgForm) {
        this.service.putUser(user).subscribe(res => {
          this.resetForm(user);
        });
      }
      populateForm(user: User) {
        this.service.user = Object.assign({}, user);
        console.log(user);
      }
}
