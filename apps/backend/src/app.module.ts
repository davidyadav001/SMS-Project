import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { StaffModule } from './staff/staff.module';
import { LmsModule } from './lms/lms.module';
import { AdmissionModule } from './admission/admission.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
    StudentModule,
    StaffModule,
    LmsModule,
    AdmissionModule,
    AnnouncementModule,
  ],
})
export class AppModule {}

