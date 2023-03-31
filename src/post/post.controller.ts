import { Body, Controller, Get, Param, Req, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostRes } from './models/post.model';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { PostCreteDto } from './dto/post-create.dto';
import { UserService } from '../user/user.service';
import { GlobalJwtService } from '../jwt/jwt.service';
import { UnauthorizedException } from '../utils/exceptions';

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

    @Post('')
    async create(@Body() postCreateDto: PostCreteDto, @Req() req: FastifyRequest){
        const refToken = req.cookies['refresh_token']
        const userPayload = await this.globalJwtService.validateRefreshToken(refToken);
        if(userPayload){
            //@ts-ignore
            await this.postService.create(userPayload.id, postCreateDto)
        }else{
            throw new UnauthorizedException()
        }
    }
}
