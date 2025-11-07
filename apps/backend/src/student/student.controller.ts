import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('student')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('dashboard')
  @Roles('student')
  @UseGuards(RolesGuard)
  async getDashboard(@Request() req) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.studentService.getDashboard(studentId);
  }

  @Get('attendance')
  @Roles('student')
  @UseGuards(RolesGuard)
  async getAttendance(@Request() req, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.studentService.getAttendance(
      studentId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('grades')
  @Roles('student')
  @UseGuards(RolesGuard)
  async getGrades(@Request() req) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.studentService.getGrades(studentId);
  }

  @Get('fees')
  @Roles('student')
  @UseGuards(RolesGuard)
  async getFees(@Request() req) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.studentService.getFees(studentId);
  }

  @Patch('fees/:feeId/pay')
  @Roles('student')
  @UseGuards(RolesGuard)
  async payFee(@Request() req, @Param('feeId') feeId: string) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.studentService.updateFeeStatus(feeId, 'paid', new Date());
  }
}

