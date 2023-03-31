import { Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dto/auth.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserArrayDto, UserResponseDto } from './dto/user-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    async getAll(): Promise<UserArrayDto>{
        return await this.userService.getAll();
    }

    @Get(':id')
    async getById(@Param('id')id: string): Promise<UserResponseDto>{
        return await this.userService.getUserById(id);
    }

    @Post('auth/register')
    async register(@Body() authDto: AuthDto, @Res({passthrough: true}) res: FastifyReply): Promise<AuthResponseDto>{
        const authResponse = await this.userService.register(authDto);
        res.setCookie('refresh_token', authResponse.refresh_token);
        return authResponse;
    }
    @Post('auth/login')
    async login(@Body() authDto: AuthDto, @Res({passthrough: true}) res: FastifyReply): Promise<AuthResponseDto> {
        const authResponse = await this.userService.login(authDto);
        res.setCookie('refresh_token', authResponse.refresh_token);
        return authResponse;
    }

    @Post('auth/refresh')
    async refresh(@Req() req: FastifyRequest, @Res({passthrough: true}) res: FastifyReply): Promise<AuthResponseDto> {
        const refresh_token = req.cookies['refresh_token'];
        if (refresh_token) {
            const authResponse = await this.userService.refresh(refresh_token);
            return authResponse;
        }
        throw new UnauthorizedException();
    }

    @Post('auth/logout')
    async logout(@Req() req: FastifyRequest, @Res({passthrough: true}) res: FastifyReply): Promise<{ status: number }> {
        if (req.cookies['refresh_token']) {
            const status = await this.userService.logout(req.cookies['refresh_token']);
            if (status.status === 200) {
                return status;
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}
