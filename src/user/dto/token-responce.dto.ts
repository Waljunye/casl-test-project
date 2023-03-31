import { IsString } from 'class-validator';

export class TokenCreationDto {
    constructor(user_id: string, refreshToken) {
        this.user_id = user_id
        this.refresh_token = refreshToken;
    }
    user_id: string;

    refresh_token: string
}
