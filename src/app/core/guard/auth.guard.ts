import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionData = sessionStorage.getItem("token");
  if (sessionData != null){
    return true;
  }else {
    router.navigateByUrl('/login');
    return false;
  }

};
