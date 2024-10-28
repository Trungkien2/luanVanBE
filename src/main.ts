import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';

import * as express from 'express';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FollowModule } from './follow/follow.module';
import { UserSettingModule } from './user-setting/user-setting.module';
import { FriendShipModule } from './friend-ship/friend-ship.module';
import { PostReportModule } from './post_report/post_report.module';
async function bootstrap() {
  const appOptions = {
    cors: true,
  };
  const config = new DocumentBuilder()
    .setTitle('Luận văn swagger API')
    .setDescription('The SnapGrams API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const app = await NestFactory.create(AppModule, appOptions);
  //global prefix
  app.setGlobalPrefix('api/v1');
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      UserModule,
      UploadModule,
      PostModule,
      CommentModule,
      FavoriteModule,
      FollowModule,
      UserSettingModule,
      FriendShipModule,
      PostReportModule,
    ],
  });
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  // Serve static files from the 'src/uploads' folder
  app.use(
    '/src/asset/images',
    express.static(join(__dirname, '..', '/src/asset/images')),
  );
  app.use(
    '/src/asset/videos',
    express.static(join(__dirname, '..', '/src/asset/videos')),
  );
  await app.listen(5000);
}
bootstrap();
