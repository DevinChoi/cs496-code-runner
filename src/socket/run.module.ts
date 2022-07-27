import { Module } from '@nestjs/common';
import { RunService } from './run.service';
import { RunGateway } from './run.gateway';

@Module({
  providers: [RunGateway, RunService]
})
export class RunModule {}
