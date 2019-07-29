import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/users.service';
import { User } from '../users/user';


@Component({
  selector: 'app-buscador-title',
  templateUrl: './buscador-title.component.html',
  styleUrls: ['./buscador-title.component.sass']
})
export class BuscadorTitleComponent implements OnInit {
  users: User[] = [];

  constructor( private activedRoute: ActivatedRoute,
               private service: UserService) { }

  ngOnInit() {
  this.activedRoute.params.subscribe(
    params => {
      console.log(params['termno']);
      // this.users = this.service.searchTitle( params[' termino '] );
      // console.log(this.users, 'USERS 23');
    }
);
  }

}
