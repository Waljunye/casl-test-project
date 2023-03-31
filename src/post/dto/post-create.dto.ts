import { IsString } from 'class-validator';

export class PostCreteDto {
    @IsString()
    title: string;

    @IsString()
    text: string;
}
