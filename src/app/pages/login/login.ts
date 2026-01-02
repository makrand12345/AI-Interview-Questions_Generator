import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = signal('');
  password = signal('');

  constructor(private api: ApiService, private router: Router) {}

  loginUser() {
  this.api.login({ email: this.email(), password: this.password() }).subscribe({
    next: (res) => {
      // 1. Save to disk
      localStorage.setItem('token', res.access_token);
      // 2. Update the live signal so ApiService sees it immediately
      this.api.token.set(res.access_token);
      
      this.router.navigate(['/generator']);
    },
    error: (err) => alert('Login failed')
  });
}
}