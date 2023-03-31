import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { PostCreteDto } from './dto/post-create.dto';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private postsRepo: typeof Post) {}

    async findAll(){
        return this.postsRepo.findAll()
    }
    async getById(id: number): Promise<Post>{
        return this.postsRepo.findOne({where: {id}})
    }
    async create(userId: string, postCreationDto: PostCreteDto){
        return await this.postsRepo.create({user_id: userId, title: postCreationDto.title, text: postCreationDto.text})
    }
}
