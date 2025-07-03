import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'deeply_profound_users';
  private currentUser: User | null = null;
  redirectUrl: string | null = null;

  constructor(private router: Router) {}

  register(username: string, email: string, password: string): Observable<{ success: boolean, message: string }> {
    if (!username || !email || !password) {
      return throwError(() => new Error('All fields are required'));
    }

    if (!this.validateEmail(email)) {
      return throwError(() => new Error('Invalid email format'));
    }

    if (password.length < 8) {
      return throwError(() => new Error('Password must be at least 8 characters'));
    }

    const users = this.getUsers();

    if (users.some(user => user.username === username)) {
      return throwError(() => new Error('Username already exists'));
    }

    if (users.some(user => user.email === email)) {
      return throwError(() => new Error('Email already registered'));
    }

    users.push({ username, email, password });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return this.login(username, password);
  }

  login(username: string, password: string): Observable<{ success: boolean, message: string }> {
    const user = this.getUsers().find(u =>
      u.username === username && u.password === password
    );

    if (user) {
      this.currentUser = user;
      localStorage.setItem('current_user', JSON.stringify(user));
      // Navigate to dashboard or stored redirect URL
      const redirectUrl = this.redirectUrl || '/dashboard';
      this.redirectUrl = null;
      this.router.navigate([redirectUrl]);
      return of({ success: true, message: 'Login successful' });
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (!this.currentUser) {
      const userJson = localStorage.getItem('current_user');
      this.currentUser = userJson ? JSON.parse(userJson) : null;
    }
    return !!this.currentUser;
  }

  getCurrentUser(): User | null {
    if (!this.currentUser && this.isLoggedIn()) {
      const userJson = localStorage.getItem('current_user');
      this.currentUser = userJson ? JSON.parse(userJson) : null;
    }
    return this.currentUser;
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}