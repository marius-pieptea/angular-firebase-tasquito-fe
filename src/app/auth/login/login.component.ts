import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.signIn(this.email, this.password).subscribe(
      (res) => {
        console.log('Login successful', res);
        this.router.navigate(['/']);
      },
      (err) => {
        console.log('Login failed', err);
      }
    );
  }
}
