import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { BuscadorTitleComponent } from './components/buscador-title/buscador-title.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UpdateUserComponent, pathMatch: 'full'},
  {path: 'buscar/:termino', component: BuscadorTitleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
