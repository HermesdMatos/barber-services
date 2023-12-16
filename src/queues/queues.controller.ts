import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { QueuesService } from './queues.service';
import CreateQueueDto from './dtos/create-queue';
import { Response } from 'express';
import { ExpertsService } from 'src/experts/experts.service';

@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService, private readonly expertsService: ExpertsService) { }
  
  @Post()
  async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
    const expertExists = await this.expertsService.findOneExpert(data.expertId);
    if (!expertExists) {
      throw new BadRequestException('Expert not found');
    }
    const queueExists = await this.queuesService.queueExistsToDay(data.expertId);
    if (queueExists) {
      throw new BadRequestException('Queue already exists');
    }
    const queue = await this.queuesService.createQueue(data);
    return res.status(HttpStatus.CREATED).json(queue);
    
  }
}
