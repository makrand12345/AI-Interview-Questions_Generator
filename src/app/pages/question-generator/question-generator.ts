import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Add this import
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-question-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-generator.html',
  styleUrls: ['./question-generator.css']
})
export class QuestionGenerator {
  jobRole = signal('');
  seniority = signal('Fresher');
  jobDescription = signal('');
  questions = signal<string[]>([]);
  isLoading = signal(false);
  selectedFile: File | null = null;

  // Inject Router here
  constructor(public api: ApiService, private router: Router) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

generate() {
  // Check if token exists before doing anything
  if (!this.api.token()) {
    alert('Please login first to generate questions!');
    this.router.navigate(['/login']);
    return; // Stop execution
  }

  this.isLoading.set(true);
  const formData = new FormData();
  formData.append('job_role', this.jobRole());
  formData.append('seniority_level', this.seniority());
  formData.append('job_description', this.jobDescription());
  if (this.selectedFile) formData.append('resume_file', this.selectedFile);

  this.api.postGenerate(formData).subscribe({
    next: (res) => {
      // Ensure res and res.questions exist before processing
      const rawQuestions = res?.questions || []; 
      const list = typeof rawQuestions === 'string' 
        ? rawQuestions.split('\n').filter(q => q.trim() !== '')
        : rawQuestions;
      
      this.questions.set(list);
      this.isLoading.set(false);
    },
    error: (err) => {
      this.isLoading.set(false);
      if (err.status === 401) {
        alert('Session expired or unauthorized. Please login again.');
        this.router.navigate(['/login']);
      } else {
        console.error('Generation Error:', err);
        alert('Could not generate questions. Please check your connection.');
      }
    }
  });
}
}