export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SurveyComponent } from './components/survey/survey.component';
import { TestComponent } from './components/test/test.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    SurveyComponent,
    ClientsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS, { useUtc: true }), { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
