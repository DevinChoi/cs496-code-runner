import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';

@Injectable()
export class RunService {
  create(createRunDto: CreateSocketDto) {
    return 'This action adds a new run';
  }

  findAll() {
    return `This action returns all run`;
  }

  findOne(id: number) {
    return `This action returns a #${id} run`;
  }

  update(id: number, updateRunDto: UpdateSocketDto) {
    return `This action updates a #${id} run`;
  }

  remove(id: number) {
    return `This action removes a #${id} run`;
  }
}
