import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  redirections = [
    { title: 'Home', link: '' },
    { title: 'Login', link: '/login' },
    { title: 'Survey', link: '/survey' },
    { title: 'Test', link: '/test'}
  ]
}
