import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserToken } from './models/user-token.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { TokenCreationDto } from './dto/token-responce.dto';
import { IncorrectPasswordException, UnauthorizedException, UserNotFoundException } from '../utils/exceptions';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserArrayDto, UserResponseDto } from './dto/user-response.dto';
import { GlobalJwtService } from '../jwt/jwt.service';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)private userRepo: typeof User,
        @InjectModel(UserToken) private tokenRepo: typeof UserToken,
        private globalJwtService: GlobalJwtService,
        private jwtService: JwtService,
        ) {}

    async getAll(): Promise<UserArrayDto>{
        return new UserArrayDto(await this.userRepo.findAll());
    }
    async getUserById(id: string): Promise<UserResponseDto | null> {
        const candidate = await this.userRepo.findOne({where: {id}});
        if (!candidate) throw new UserNotFoundException();
        return candidate;
    }
    async register(authDto: AuthDto): Promise<AuthResponseDto> {
        const {username: id, password} = authDto;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await this.userRepo.create({id, password: hashedPassword});
        const finalUser = await this.userRepo.findOne({where: {id: newUser.id}});
        if (finalUser) return await this.generateToken(finalUser);
        // throw new TransactionException();
    }
    async login(authDto: AuthDto): Promise<AuthResponseDto> {
        const {username: id, password} = authDto;
        const candidate = await this.getUserById(id);
        if (!candidate) {
            throw new UserNotFoundException();
        }
        const isCompare = await bcrypt.compare(password, candidate.password);
        if (!isCompare) {
            throw new IncorrectPasswordException();
        }
        return await this.generateToken(candidate);
    }

    async logout(refresh_token: string): Promise<{status: number}> {
        return (await this.tokenRepo.destroy({where: {refresh_token: refresh_token}})) ? {status: 200} : {status: 401};
    }

    async refresh(refreshToken: string): Promise<AuthResponseDto> {
        const candidate = await this.globalJwtService.validateRefreshToken(refreshToken);
        if (!candidate) {
            throw new UnauthorizedException();
        }
        const user = await this.userRepo.findOne({where: {id: candidate.id}});
        if (user) {
            return await this.generateToken(user);
        }
        throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async generateToken(user: User): Promise<AuthResponseDto> {
        const refreshToken = this.jwtService.sign({
                id: user.id,
                created_at: user.created_at
            },
            {
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
                privateKey: process.env.JWT_REFRESH_TOKEN_KEY
            });
        const accessToken = this.jwtService.sign({
                id: user.id,
                created_at: user.created_at
            },
            {
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
                privateKey: process.env.JWT_ACCESS_TOKEN_KEY
            });
        const tokenCreationAttrs = new TokenCreationDto(user.id, refreshToken);
        // @ts-ignore
        await this.tokenRepo.create(tokenCreationAttrs);
        return new AuthResponseDto(accessToken, refreshToken, user);
    }


}
