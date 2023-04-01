import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GlobalJwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private reflector: Reflector,
                private globalJwtService: GlobalJwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const [bearer, token] = request.headers.authorization.split(' ');
        if(!bearer) return false;
        if(await this.globalJwtService.validateAccessToken(token))
            return true;
    }


}
