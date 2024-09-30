import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    sessionStorage.removeItem('userId');
  }

  printValues() {
    console.log('Username: ', this.username);
    console.log('Password: ', this.password);

    this.router.navigate(['/clients-list']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.authenticate(username, password).subscribe(
        (user) => {
          console.log(user);
          if (user) {
            sessionStorage.setItem('userId', user.id);
            this.router.navigate(['/clients-list']);
          }
          else
            alert('Invalid credentials')
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}