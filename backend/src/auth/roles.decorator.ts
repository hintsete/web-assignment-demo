/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Roles } from '../utility/common/user-roles.enum';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
