import { Module } from '@nestjs/common';
import { AdmissionController } from './admission.controller';
import { AdmissionService } from './admission.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AdmissionController],
  providers: [AdmissionService, JwtAuthGuard],
  exports: [AdmissionService],
})
export class AdmissionModule {}

