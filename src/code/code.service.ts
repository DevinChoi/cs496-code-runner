import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { CodeEntity } from './entities/code.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(CodeEntity) private codeRepository: Repository<CodeEntity>  // 레포지토리 주입
  ) { }
  
  async saveCode(level: string, language: string, code_text: string) {
    //코드 엔티티 객체 생성
    const code = new CodeEntity();
    // 전달 받은 정보 엔티티에 설정
    // id auto increment
    code.level = level;
    code.language = language;
    code.code_text = code_text;
    // 레포지토리로 엔티티를 데이터베이스에 저장
    await this.codeRepository.save(code);
  }

  async findAll() {
    // return `This action returns all code`;
    return this.codeRepository.find();
  }

  async findByLevel(level: string) {
    const code = new CodeEntity();
    code.level = level;
    return this.codeRepository.findAndCountBy(code);
  }

  async findRandomOne(level: string) {
    const codes = await this.findByLevel(level);
    console.log('ready to choose');
    console.log(codes);
    let min = 0;
    let max = codes[1];
    const randomnum = Math.floor(Math.random() * (max - min)) + min;
    console.log(randomnum);
    return codes[0][randomnum].code_text;
  }

  async remove(id: number) {
    const findfirst = this.codeRepository.findOneById(id);
    const findresult = findfirst.then(IDs => {
      console.log(findfirst,IDs);
      if (IDs == null) {
        console.log('promise null');
        return `There is no id:${id} entity`;
      } else {
        console.log('promise entity')
        const code = new CodeEntity();
        code.id = id;
        this.codeRepository.remove(code);
        return `id:${id} entity is removed`;
      }
    })
    .catch(error => {
      console.log(error);
    })
    return findresult;
  }
}
