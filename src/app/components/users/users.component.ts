import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/users.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm = new FormGroup({
    title: new FormControl(''),
    id: new FormControl(''),
  });
  users: User[] = [];
  user: User[] = [];
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
      if(user == '' ) {
        return;
      }
      const newUser = this.userForm.value;
      this.service.postUser(newUser).subscribe(
        user => this.users.push(user)
      );
      // TODO: Use EventEmitter with form value
      console.warn(this.userForm.value);
       return false;
    }


  // createFormGroup(userForm) {
  //   return new FormGroup({
  //     personalData: new FormGroup({
  //       title: new FormControl(),
  //     }),
  //     requestType: new FormControl(),
  //     text: new FormControl()
  //   });
  // }

  //   onSubmit( userForm: FormGroup ): void {
  //     if (this.userForm.value !== '') {
  // this.service.addUser(this.userForm.controls['title'].value)
  //   .subscribe(user => this.users.push(user)

  //   );

  //     } else {
  //      alert('Por favor ingresar datos completos');
  //     }
  //   }
  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.warn(this.userForm.value);
  // }
}
