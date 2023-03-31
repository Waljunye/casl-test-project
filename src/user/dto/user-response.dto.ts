import { Exclude, Expose, Type } from 'class-transformer';
import { User } from '../models/user.model';
import { IsArray, IsDate, IsString, ValidateNested } from 'class-validator';

@Exclude()
export class UserResponseDto extends User{
    constructor(user: User) {
        super();
        Object.assign(this, user)
    }
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsDate()
    created_at: Date;
    @Expose()
    @IsDate()
    updated_at: Date;
}

export class UserArrayDto {
    constructor(rows: User[]) {
        this.users = rows;
    }

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UserResponseDto)
    users: UserResponseDto[];
}
