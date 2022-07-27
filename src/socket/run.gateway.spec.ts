import { Test, TestingModule } from '@nestjs/testing';
import { RunGateway } from './run.gateway';
import { RunService } from './run.service';

describe('RunGateway', () => {
  let gateway: RunGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunGateway, RunService],
    }).compile();

    gateway = module.get<RunGateway>(RunGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
