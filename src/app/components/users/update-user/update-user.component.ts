import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.sass']
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl()
   });
  }

}
