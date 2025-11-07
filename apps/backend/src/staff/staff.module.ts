import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [StaffController],
  providers: [StaffService, JwtAuthGuard],
  exports: [StaffService],
})
export class StaffModule {}

