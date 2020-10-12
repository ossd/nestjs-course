import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp(),
      request = host.getRequest();
    const user = request['user'];
    const allowed = this.isAllowed(user.roles);

    console.log('User is allowed: ', allowed);

    if (!allowed) {
      console.log(
        'User is authenticated but not allowed to access this page. Access denyed',
      );
      throw new ForbiddenException();
    }

    return true;
  }

  isAllowed(userRoles: string[]): boolean {
    console.log('Comparing roles: ' + this.allowedRoles, userRoles);

    let allowed = false;

    userRoles.forEach(userRole => {
      console.log('Checking if role is allowed ', userRoles);

      if (!allowed && this.allowedRoles.includes(userRole)) {
        allowed = true;
      }
    });

    return allowed;
  }
}
