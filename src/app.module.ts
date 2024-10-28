import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LogsMiddleware, QueryMiddleware } from './core/middlewares';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { EmailService } from './mail/mail.service';
import { EmailModule } from './mail/mail.module';
import * as redisStore from 'cache-manager-redis-store';
import { APP_FILTER } from '@nestjs/core';
import { BaseExceptionFilter } from './core/filters/BaseExceptionFilter.filter';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { UserSettingModule } from './user-setting/user-setting.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FollowModule } from './follow/follow.module';
import { CommentModule } from './comment/comment.module';
import { FriendShipModule } from './friend-ship/friend-ship.module';
import { PostReportModule } from './post_report/post_report.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    EmailModule,
    UploadModule,
    PostModule,
    UserSettingModule,
    FavoriteModule,
    FollowModule,
    CommentModule,
    FriendShipModule,
    PostReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryMiddleware, LogsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
