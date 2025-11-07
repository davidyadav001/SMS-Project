import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(studentId: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        fees: {
          orderBy: { dueDate: 'desc' },
          take: 5,
        },
        attendance: {
          orderBy: { date: 'desc' },
          take: 30,
        },
        grades: {
          include: {
            student: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async getAttendance(studentId: string, startDate?: Date, endDate?: Date) {
    const where: any = { studentId };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    return this.prisma.attendance.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async getGrades(studentId: string) {
    return this.prisma.grade.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFees(studentId: string) {
    return this.prisma.fee.findMany({
      where: { studentId },
      orderBy: { dueDate: 'desc' },
    });
  }

  async updateFeeStatus(feeId: string, status: string, paidDate?: Date) {
    return this.prisma.fee.update({
      where: { id: feeId },
      data: {
        status,
        paidDate: paidDate || new Date(),
      },
    });
  }
}

