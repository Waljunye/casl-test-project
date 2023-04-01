import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { TracingExceptionFilter } from './tracing/tracing.filter';
import { fastifyCookie } from '@fastify/cookie';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

dotenv.config({path: `.${process.env.NODE_ENV}.env`})

const PORT = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const options = new DocumentBuilder()
      .setTitle('User architecture carcass')
      .setDescription('For testing features')
      .setVersion('0.1')
      .addOAuth2({
            type: 'oauth2',
            flows: {
              password: {
                tokenUrl: '/user/auth/login',
                refreshUrl: '/user/auth/refresh',
                scopes: []
              }
            }
          }
      )
      .build();
  app.enableCors({
    origin: (origin, callback) => {
      console.log('aproved')
      callback(null, true)
    },
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  })
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {enableImplicitConversion: true}
  }));
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {
      httpOnly: true
    }
  });
  app.useGlobalFilters(app.get(TracingExceptionFilter));
  await app.listen(PORT, () => console.log(`server started at port ${PORT}`));
}

bootstrap();
