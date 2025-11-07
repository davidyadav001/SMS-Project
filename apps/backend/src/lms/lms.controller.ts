import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LmsService } from './lms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('lms')
@UseGuards(JwtAuthGuard)
export class LmsController {
  constructor(private lmsService: LmsService) {}

  @Get('materials')
  @Roles('student', 'lms_student', 'staff', 'admin')
  @UseGuards(RolesGuard)
  async getMaterials(@Query('subjectId') subjectId?: string) {
    return this.lmsService.getMaterials(subjectId);
  }

  @Get('assignments')
  @Roles('student', 'lms_student', 'staff', 'admin')
  @UseGuards(RolesGuard)
  async getAssignments(@Query('subjectId') subjectId?: string) {
    return this.lmsService.getAssignments(subjectId);
  }

  @Post('assignments/submit')
  @Roles('student', 'lms_student')
  @UseGuards(RolesGuard)
  async submitAssignment(@Request() req, @Body() data: any) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.lmsService.submitAssignment({
      ...data,
      studentId,
    });
  }

  @Get('quizzes')
  @Roles('student', 'lms_student', 'staff', 'admin')
  @UseGuards(RolesGuard)
  async getQuizzes(@Query('subjectId') subjectId?: string) {
    return this.lmsService.getQuizzes(subjectId);
  }

  @Post('quizzes/:quizId/start')
  @Roles('student', 'lms_student')
  @UseGuards(RolesGuard)
  async startQuiz(@Request() req, @Param('quizId') quizId: string) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.lmsService.startQuiz(quizId, studentId);
  }

  @Post('quizzes/attempts/:attemptId/submit')
  @Roles('student', 'lms_student')
  @UseGuards(RolesGuard)
  async submitQuiz(
    @Param('attemptId') attemptId: string,
    @Body() data: { answers: any; score: number },
  ) {
    return this.lmsService.submitQuiz(attemptId, data.answers, data.score);
  }

  @Get('progress')
  @Roles('student', 'lms_student')
  @UseGuards(RolesGuard)
  async getProgress(@Request() req) {
    const studentId = req.user.student?.id;
    if (!studentId) {
      throw new Error('Student profile not found');
    }
    return this.lmsService.getProgress(studentId);
  }
}

