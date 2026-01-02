import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Required for router-outlet
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar], // Removed unused QuestionGenerator import
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}