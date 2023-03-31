import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [PostController],
  imports:[SequelizeModule.forFeature([Post])],
  providers: [PostService],
})
export class PostModule {}
