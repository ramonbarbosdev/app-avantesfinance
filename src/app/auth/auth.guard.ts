import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (!token) {
    auth.logout();
    router.navigate(['/login']);
    return false;
  }

  const rolesPermitidos = route.parent?.data?.['roles'] as string[] | undefined;
  console.log(rolesPermitidos);
  return auth.user$.pipe(
    take(1),
    map((user) => {
      const userRole = user?.role;

      if (!user || (rolesPermitidos && !rolesPermitidos.includes(userRole))) {
        auth.logout();
        router.navigate(['/login']);
        return false;
      }

      return true;
    })
  );
};
