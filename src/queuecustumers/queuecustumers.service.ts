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

  async attendCustomers (customerID: number) {
    await this.prisma.queueCustomer.update({
      where: {
        id: customerID
      },
      data: {
        isAwaitng: false
      }
    })
  }

  async findCustomer(custumerID: number) {
    return await this.prisma.queueCustomer.findFirst({
      where: {
        id: custumerID
      }
    })
  }
  async deleteCustomer(custumerID: number) {
    await this.prisma.queueCustomer.delete({
      where: {
        id: custumerID
      }
    })
  }
}
