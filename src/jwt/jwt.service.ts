import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GlobalJwtService {
    constructor(private jwtService: JwtService) {}
    async validateRefreshToken(refresh_token): Promise<any> {
        try {
            return await this.jwtService.verify(refresh_token, {publicKey: process.env.JWT_REFRESH_TOKEN_KEY});
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    async validateAccessToken(access_token): Promise<any> {
        try {
            return await this.jwtService.verify(access_token, {secret: process.env.JWT_SECRET});
        } catch (e) {
            console.log(e)
            return null;
        }
    }
}
