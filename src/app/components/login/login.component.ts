import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { CryptoService } from '../../services/crypto/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private crypto: CryptoService) {
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
            sessionStorage.setItem('userId', this.crypto.encrypt(user.id).toString());
            this.router.navigate(['/clients-list']);
          }
          else
            alert('Credenziali non valide')
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}