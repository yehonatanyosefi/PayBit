import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export function authGuard() {
  const user = inject(UserService).getLoggedInUser();
  if (user !== null) return true;
  else {
    inject(Router).navigateByUrl('/auth');
    return false;
  }
}
