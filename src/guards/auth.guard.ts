import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/roles.decorator'; 
import { UserRole } from 'src/user/entities/user.entity'; 
@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
   
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; 
    }

  
    const request = context.switchToHttp().getRequest();
    const user = request.user;

  
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'Forbidden resource',
      );
    }

    return true;
  }
}
