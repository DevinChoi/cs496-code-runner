import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunModule } from './socket/run.module';
import { CodeModule } from './code/code.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeEntity } from './code/entities/code.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'osm',
      password: '0123456789',
      database: 'test',
      entities: [CodeEntity],
      synchronize: true,
    }),
    RunModule, 
    CodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
