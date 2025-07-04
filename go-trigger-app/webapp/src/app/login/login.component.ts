import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

isLoading = false;

onSubmit(): void {
  this.isLoading = true;
  this.authService.login(this.username, this.password).subscribe({
    next: () => this.isLoading = false,
    error: (err) => {
      this.isLoading = false;
      this.error = err.message;
    }
    
  });

}
}