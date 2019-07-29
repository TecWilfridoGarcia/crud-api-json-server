import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/users.service';
import { User } from '../user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.sass']
})
export class UpdateUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  first: any;
  id: any;
  title: any;

  constructor(private formBuilder: FormBuilder,
              private service: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    this.getUserById(this.id);
  }

  getUserById(id: number): void {
    this.route.params.forEach((params: Params) => {
      if (params.id !== undefined) {
        const id = +params.id;
        this.service.getUserById(id)
        .toPromise()
            .then((data) => {
              this.editForm.setValue(data);
              this.user = data;
              console.log(this.user);
          })
          .catch(err => {console.log(err); });
      }
    });
  }


  onSubmit(user): void {
    this.service.putUser(this.editForm.value)
      .subscribe(
        data => {
         alert(data);
         this.router.navigate(['/users']);

        },
        error => {
         alert(error);
        });
  }
}
