import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    content: string;
    type: string;
    target: string;
    createdBy?: string;
  }) {
    return this.prisma.announcement.create({ data });
  }

  async findAll(target?: string) {
    const where: any = {};
    if (target && target !== 'all') {
      where.target = target;
    }
    return this.prisma.announcement.findMany({
      where: where.target ? where : undefined,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async findOne(id: string) {
    return this.prisma.announcement.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.announcement.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.announcement.delete({
      where: { id },
    });
  }
}

