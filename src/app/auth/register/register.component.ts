import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.signUp(this.email, this.password).subscribe(
      (res) => {
        console.log('Registration successful', res);
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log('Registration failed', err);
      }
    );
  }
}
