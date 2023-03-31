import { Exclude, Expose, Type } from 'class-transformer';
import { User } from '../models/user.model';
import { IsString, ValidateNested } from 'class-validator';
import { UserResponseDto } from './user-response.dto';

@Expose()
export class AuthResponseDto {
    constructor(accessToken: string, refreshToken: string, user: User) {
        this.access_token = accessToken;
        this.refresh_token = refreshToken;
        this.user = user;
    }
    @IsString()
    access_token: string;

    @ValidateNested({each: true})
    @Type(() => UserResponseDto)
    user: UserResponseDto;

    @Exclude()
    refresh_token: string;


}
