import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  email = signal('');
  password = signal('');

  constructor(private api: ApiService, private router: Router) {}

  signupUser() {
  this.api.register({ email: this.email(), password: this.password() }).subscribe({
    next: () => {
      alert('Signup successful! Please login.');
      this.router.navigate(['/login']);
    },
    error: (err: any) => { // Added : any here
      console.error(err);
      alert('Signup failed');
    }
  });
}
}