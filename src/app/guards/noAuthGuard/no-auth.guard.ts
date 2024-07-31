import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          console.log("You're already logged in");
          this.router.navigate(['/issues']);
          return false;
        }
        return true;
      })
    );
  }
}
