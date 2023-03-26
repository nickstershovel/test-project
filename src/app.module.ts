import { Module } from '@nestjs/common';
import { PlanetController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [PlanetController],
  providers: [AppService],
})
export class AppModule {}
