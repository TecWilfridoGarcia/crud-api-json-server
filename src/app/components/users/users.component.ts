import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/users.service';
import { User } from './user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import uuid from 'uuid/v4';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  userForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  users: User[] = [];
  user: User;
  usersList: Observable<User[]>;
  showModal = false;

  constructor(private service: UserService, private fb: FormBuilder, private router: Router) {

  }
  filterPost = '';

  ngOnInit() {
    this.reloadData();
  }

  onSubmit() {
    this.postUser(this.user);
  }

  handleNewTicket() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  postUser(user): void {
    if (!this.userForm.value.title) {
      return;
    }
    const { title } = this.userForm.value;
    this.service.postUser({ title, id: uuid() }).subscribe(
      (data) => {
        this.showModal = false;
        this.reloadData();
      }
    );
  }
  reloadData() {
    this.service.getUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(this.users);
        }
      );
  }
  suppressUser(id: any) {
    if (confirm('Are you sure to delete this item?')) {
      this.service.deleteUser(id).subscribe(
        data => {
          this.reloadData();
        }
      );
    }
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
  updateUser(user: User) {
    this.router.navigate(['/users', user.id]);
    console.warn(user);
  }
}
