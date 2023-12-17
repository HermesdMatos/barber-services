import { Body, Controller, Delete, HttpStatus, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { QueuecustumersService } from './queuecustumers.service';
import CreateQueuecustomersDto from './dtos/create-queuecustomers';
import { Response } from 'express';

@Controller('queuecustumers')
export class QueuecustumersController {
  constructor(private readonly queuecustumersService: QueuecustumersService) { }
  
  @Post()
  async addCustomer(@Body() data: CreateQueuecustomersDto, @Res() res: Response) {
    const queueExists = await this.queuecustumersService.getExpertsQueueToday(data.expertId);
    if (!queueExists) {
      throw new NotFoundException('Não existe uma fila para hoje');
    }
    const queue = await this.queuecustumersService.addCustomer({
      name: data.name,
      service: data.service,
      queueId: queueExists.id
    });
    return res.status(HttpStatus.CREATED).json(queue);
  }

  @Patch(':id')
  async attendCustomer(@Param('id') id: string, @Res() res: Response) {
    const customer = await this.queuecustumersService.findCustomer(+id);
    if (!customer) {
      throw new NotFoundException('O cliente não existe');
    }

    await this.queuecustumersService.attendCustomers(customer.id);
    return res.status(HttpStatus.NO_CONTENT).json(customer);

  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string, @Res() res: Response) {
    const customer = await this.queuecustumersService.findCustomer(+id);
    if (!customer) {
      throw new NotFoundException('O cliente não existe');
    }

    await this.queuecustumersService.deleteCustomer(customer.id);
    return res.status(HttpStatus.NO_CONTENT).json();

  }
}
