import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { TracingModule } from './tracing/tracing.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GlobalJwtService } from './jwt/jwt.service';
import { AuthGuard } from './Guards/AuthGuard';

@Global()
@Module({
  imports: [
      JwtModule.register({secret: process.env.JWT_SECRET}),
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      TracingModule,
      UserModule,
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT),
        username: `${process.env.DB_USERNAME}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_DATABASE}`,
        autoLoadModels: true
      }),
      JwtModule,
  ],
    providers: [JwtService, GlobalJwtService, AuthGuard],
  exports:[
      SequelizeModule,
      JwtService,
      GlobalJwtService,
      AuthGuard
  ],
})
export class AppModule {}
