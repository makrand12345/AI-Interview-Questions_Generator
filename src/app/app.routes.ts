import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { QuestionGenerator } from './pages/question-generator/question-generator';

export const routes: Routes = [
  { path: '', redirectTo: 'generator', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'signup', component: Signup },
  { path: 'generator', component: QuestionGenerator }
];