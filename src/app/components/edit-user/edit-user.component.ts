import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/users.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  users: any = {};
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service:UserService,
    private fb: FormBuilder) {
      this.createForm();
 }

  createForm() {
    this.userForm = this.fb.group({
        id: ['', Validators.required ],
        title: ['', Validators.required ]
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.updateUser(params['id']).subscribe(res => {
        this.users = res;
    });
  });
}
  }


