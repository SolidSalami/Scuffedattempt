import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivegameService } from './livegame.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { RiotVersionService } from './riot-version.service';

@Module({
  imports: [HttpModule, CacheModule.register({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService, LivegameService, RiotVersionService],
})
export class AppModule { }
