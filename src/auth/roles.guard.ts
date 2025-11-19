import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // no roles required -> allow
        if (!requiredRoles || requiredRoles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user; // set by JwtAuthGuard

        if (!user || !user.role) {
            throw new ForbiddenException('No role found on user');
        }

        // if user's role is one of required roles -> allow
        if (requiredRoles.includes(user.role)) return true;

        throw new ForbiddenException("You don't have permission (role mismatch)");
    }
}
