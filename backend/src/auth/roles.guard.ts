/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Roles } from '../utility/common/user-roles.enum'; // Make sure the enum is imported

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // If no roles are specified, allow access by default
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Ensure the user object and roles are present
    if (!user || !user.roles) {
      return false; // If user doesn't have roles, deny access
    }

    return requiredRoles.some((role) => user.roles.includes(role)); // Check if any of the user's roles match the required ones
  }
}
