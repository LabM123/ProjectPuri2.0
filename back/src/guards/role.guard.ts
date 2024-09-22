import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/decorators/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async validateRoles(request, requiredRoles) {
        const user = request.user;
        const hasRole = () => requiredRoles.some((role) => user?.roles?.includes(role));
        const valid = user && user.roles && hasRole();
        if (!valid)throw new UnauthorizedException("No estas autorizado a acceder a este recurso")
        return true;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>("Roles", [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        try {
            return await this.validateRoles(request, requiredRoles);
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}