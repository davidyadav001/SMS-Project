import { Module } from '@nestjs/common';
import { LmsController } from './lms.controller';
import { LmsService } from './lms.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [LmsController],
  providers: [LmsService, JwtAuthGuard],
  exports: [LmsService],
})
export class LmsModule {}

