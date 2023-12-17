import { Module } from "@nestjs/common";
import { PrismaModule } from "./database/prisma.module";
import { ExpertsModule } from './experts/experts.module';
import { QueuesModule } from './queues/queues.module';
import { QueuecustumersModule } from './queuecustumers/queuecustumers.module';

@Module({
  imports: [PrismaModule, ExpertsModule, QueuesModule, QueuecustumersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
