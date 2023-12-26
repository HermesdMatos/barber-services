import { Module } from "@nestjs/common";
import { PrismaModule } from "./database/prisma.module";
import { ExpertsModule } from './experts/experts.module';
import { QueuesModule } from './queues/queues.module';
import { QueuecustumersModule } from './queuecustumers/queuecustumers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { JwtModule } from './jwt/jwt.module';
import { UsersLogadoController } from './users/users-logado.controller';

@Module({
  imports: [PrismaModule, ExpertsModule, QueuesModule, QueuecustumersModule, UsersModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
