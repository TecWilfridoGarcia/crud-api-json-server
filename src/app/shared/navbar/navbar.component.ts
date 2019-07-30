import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private routes: Router) { }

  ngOnInit() {

  }

  buscarTitle(termino: string) {
    // console.log(termino);
    this.routes.navigate(['/buscar',termino] );
  }

}
