import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import prisma from './prisma.service';

@Controller('planets')
export class PlanetController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    return prisma.planet.findMany();
  }
}
