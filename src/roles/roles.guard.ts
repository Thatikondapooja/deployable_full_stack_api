import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user; // comes from JwtAuthGuard

        if (!user || !user.roles || user.roles.length === 0) {
            throw new ForbiddenException('No roles found on user');
        }

        // Allow if user has at least one required role
        const hasRole = user.roles.some(role =>
            requiredRoles.includes(role) 
        );
        if (hasRole) return true;

        throw new ForbiddenException("You don't have permission (role mismatch)");
    }
}
