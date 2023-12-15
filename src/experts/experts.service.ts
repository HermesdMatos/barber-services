import { Injectable } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/database/prisma.service';
import CreateExpertsDto from './dtos/create-experts';

@Injectable()
export class ExpertsService {
  constructor(private readonly prisma: PrismaService) { }
  async findExpertsbyEmail(email: string) {
    return await this.prisma.expert.findFirst({
      where: {
        email,
      },
    });
  }

  async createExpert(data: CreateExpertsDto) {
    return await this.prisma.expert.create({data})
  }

  async findAllExperts() {
    return await this.prisma.expert.findMany();
  }
  async findOneExpert(id: string) {
    return await this.prisma.expert.findFirst({
      where: {
        id,
      }
    });
  }
  async updateExpert(id: string, data: CreateExpertsDto) {
    await this.prisma.expert.update({where: {id}, data})
  }
}
