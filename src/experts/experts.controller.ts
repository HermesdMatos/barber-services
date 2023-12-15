import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import CreateExpertsDto from './dtos/create-experts';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) { }
  
  @Post()
  async create(@Body() data: CreateExpertsDto, @Res() res: any) {
    const expertExists = await this.expertsService.findExpertsbyEmail(data.email);
    if (expertExists) {
      throw new BadRequestException('Email already exists');
    }
    const expert = await this.expertsService.createExpert(data);
    return res.status(HttpStatus.CREATED).json(expert);
  }
}
