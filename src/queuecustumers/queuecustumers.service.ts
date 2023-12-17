import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

type createCustumer = {
  name: string
  service: string
  queueId: string

}
@Injectable()
export class QueuecustumersService {
  constructor(private readonly prisma: PrismaService) { }
  
  async addCustomer(data: createCustumer) {
    return await this.prisma.queueCustomer.create({data})
  }

  async getExpertsQueueToday(expertId: string) {
    return await this.prisma.queue.findFirst({
      where: {
        expertId,
        createdAt: {equals: new Date()}
      }
      
    })
  }
}
