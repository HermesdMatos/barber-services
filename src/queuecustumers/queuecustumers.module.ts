import { Module } from '@nestjs/common';
import { QueuecustumersService } from './queuecustumers.service';
import { QueuecustumersController } from './queuecustumers.controller';

@Module({
  controllers: [QueuecustumersController],
  providers: [QueuecustumersService],
})
export class QueuecustumersModule {}
