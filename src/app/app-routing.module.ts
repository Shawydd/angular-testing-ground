import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
//import { SurveyComponent } from './components/survey/survey.component';

import { RouteguardService } from './services/routeguard/routeguard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clients-list', component: ClientsListComponent, canActivate: [RouteguardService] },
  { path: 'login', component: LoginComponent },
  //{ path: 'survey', component: SurveyComponent },
  { path: 'test', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
