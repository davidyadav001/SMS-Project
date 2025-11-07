import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('announcements')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Get()
  async findAll(@Query('target') target?: string) {
    return this.announcementService.findAll(target);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.announcementService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async create(@Body() data: any) {
    return this.announcementService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.announcementService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async remove(@Param('id') id: string) {
    return this.announcementService.remove(id);
  }
}

