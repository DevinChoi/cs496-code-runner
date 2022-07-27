import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post()
  create(
    @Query('level') level:string,
    @Query('language') language:string,
    @Query('code_text') code_text:string
  ) {
    this.codeService.saveCode(level, language, code_text);
    return 'level: '+level+' language: '+language+' code_text: '+code_text; 
  }

  @Get()
  findAll() {
    return this.codeService.findAll();
  }

  @Get(':level')
  findAllByLevel(@Param('level') level: string) {
    return this.codeService.findByLevel(level);
  }

  @Get(':level/random')
  findRandomOne(@Param('level') level: string) {
    return this.codeService.findRandomOne(level);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeService.remove(+id);
  }
}
