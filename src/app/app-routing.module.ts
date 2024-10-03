import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { RouteguardService } from './services/routeguard/routeguard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clients-list', component: ClientsListComponent, canActivate: [RouteguardService] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
