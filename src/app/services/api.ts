import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Use the specific Render URL from your backend logs
  public url = 'https://ai-interview-questions-generator-b.onrender.com/api/v1';
  
  // Syncs with localStorage immediately on load
  public token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  /**
   * Fast API OAuth2 Login
   * Uses x-www-form-urlencoded as required by the backend
   */
  login(credentials: any) {
    const body = new URLSearchParams();
    body.set('username', credentials.email); 
    body.set('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(`${this.url}/auth/login`, body.toString(), { headers });
  }

  /**
   * User Registration
   * Check if your backend expects /register or /signup 
   */
  register(userData: any) {
    return this.http.post<any>(`${this.url}/auth/signup`, userData);
  }

  /**
   * Question Generation
   * Injects the JWT token from the signal into the Authorization header
   */
  postGenerate(formData: FormData) {
    const currentToken = this.token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${currentToken}`
    });
    return this.http.post<any>(`${this.url}/generate`, formData, { headers });
  }

  /**
   * Helper to clear session
   */
  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}