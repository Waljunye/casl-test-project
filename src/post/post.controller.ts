import { Body, Controller, Get, Param, Req, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostRes } from './models/post.model';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { PostCreteDto } from './dto/post-create.dto';
import { UserService } from '../user/user.service';
import { GlobalJwtService } from '../jwt/jwt.service';
import { UnauthorizedException } from '../utils/exceptions';
import { AuthGuard } from '../Guards/AuthGuard';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
        private globalJwtService: GlobalJwtService
    ) {}

    @Get('')
    async getAll(){
        return await this.postService.findAll()
    }

    @Get(':id')
    async getPostById(@Param('id') id: number): Promise<PostRes>{
        return this.postService.getById(id);
    }

    @ApiOAuth2([])
    @UseGuards(AuthGuard)
    @Post('')
    async create(@Body() postCreateDto: PostCreteDto, @Req() req: FastifyRequest){
        const accToken = req.headers.authorization.split(' ')[1];
        console.log(req.headers.authorization.split(' ')[1])
        const userPayload = await this.globalJwtService.validateAccessToken(accToken);
        console.log(userPayload)
        if(userPayload){
            //@ts-ignore
            await this.postService.create(userPayload.id, postCreateDto)
        }else{
            throw new UnauthorizedException()
        }
    }
}
