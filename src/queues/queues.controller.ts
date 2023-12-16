import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
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
      throw new BadRequestException('Fila inexistente');
    }
    const queueExists = await this.queuesService.queueExistsToDay(data.expertId);
    if (queueExists) {
      throw new BadRequestException('Não existe uma fila para hoje');
    }
    const queue = await this.queuesService.createQueue(data);
    return res.status(HttpStatus.CREATED).json(queue);
    
  }

  @Get()
  async getExpertQueue(@Query('expertId') expertId: string, @Res() res: Response) {

    if (expertId) {
      const expert = await this.queuesService.getExpertQueue(expertId);

      if (expert.length === 0) {
        throw new BadRequestException('O expert não existe');
      }
      const queues = await this.queuesService.getExpertQueue(expertId);
      return res.json(queues);
    }
    const queues = await this.queuesService.getQueues();
      return res.json(queues);
  }

  @Get('today')
  async getQueueToday(@Res() res: Response) {
    const queuesToday = await this.queuesService.getQueueToday();
    return res.json(queuesToday);
  }

}
