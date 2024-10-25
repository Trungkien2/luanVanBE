import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { favoriteProvider } from './favorite.prodiver';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, ...favoriteProvider],
  exports: [FavoriteService],
})
export class FavoriteModule {}
