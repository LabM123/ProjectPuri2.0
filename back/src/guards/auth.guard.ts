import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers.authorization;
            if(!authHeader) throw new UnauthorizedException('No hay token')
            const bearer = authHeader.split(' ')[0];
            if(!bearer) throw new UnauthorizedException('Token invalido')
            const token = authHeader.split(' ')[1];
            if(!token) throw new UnauthorizedException('No hay token')
            const secret = process.env.JWT_SECRET;
            const user = this.jwtService.verify(token, {secret});
            user.exp = new Date(user.exp * 1000);
            user.roles = user.isAdmin;
            request.user = user;
            return true
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }
}