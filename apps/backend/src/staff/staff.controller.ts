import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('staff')
@UseGuards(JwtAuthGuard)
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get('dashboard')
  @Roles('staff', 'admin')
  @UseGuards(RolesGuard)
  async getDashboard(@Request() req) {
    const staffId = req.user.staff?.id;
    if (!staffId) {
      throw new Error('Staff profile not found');
    }
    return this.staffService.getDashboard(staffId);
  }

  @Get('students')
  @Roles('staff', 'admin')
  @UseGuards(RolesGuard)
  async getStudents(@Request() req, @Body('className') className?: string) {
    return this.staffService.getStudents(className);
  }

  @Post('attendance')
  @Roles('staff', 'admin')
  @UseGuards(RolesGuard)
  async markAttendance(@Body() data: any) {
    return this.staffService.markAttendance({
      ...data,
      date: new Date(data.date),
    });
  }

  @Post('grades')
  @Roles('staff', 'admin')
  @UseGuards(RolesGuard)
  async addGrade(@Body() data: any) {
    return this.staffService.addGrade({
      ...data,
      examDate: data.examDate ? new Date(data.examDate) : undefined,
    });
  }

  @Get('subjects')
  @Roles('staff', 'admin')
  @UseGuards(RolesGuard)
  async getSubjects(@Request() req) {
    const staffId = req.user.staff?.id;
    if (!staffId) {
      throw new Error('Staff profile not found');
    }
    return this.staffService.getSubjects(staffId);
  }
}

