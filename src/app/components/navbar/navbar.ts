import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public api: ApiService, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.api.token.set(null);
    this.router.navigate(['/login']);
  }
}