import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserToken } from './models/user-token.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
      SequelizeModule.forFeature([User, UserToken]),
  ],
    exports: [],
})
export class UserModule {}
