import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('admission')
export class AdmissionController {
  constructor(private admissionService: AdmissionService) {}

  @Post('apply')
  async createApplication(@Body() data: any) {
    return this.admissionService.createApplication(data);
  }

  @Get('applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async getApplications(@Query('status') status?: string) {
    return this.admissionService.getApplications(status);
  }

  @Get('applications/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async getApplication(@Param('id') id: string) {
    return this.admissionService.getApplication(id);
  }

  @Patch('applications/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async updateApplicationStatus(
    @Param('id') id: string,
    @Body() data: { status: string; remarks?: string },
  ) {
    return this.admissionService.updateApplicationStatus(
      id,
      data.status,
      data.remarks,
    );
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async getDashboard() {
    return this.admissionService.getDashboard();
  }
}

