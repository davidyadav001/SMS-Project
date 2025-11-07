import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(staffId: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { id: staffId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        subjects: {
          include: {
            class: true,
            _count: {
              select: {
                materials: true,
                assignments: true,
              },
            },
          },
        },
      },
    });

    return staff;
  }

  async getStudents(className?: string) {
    const where = className ? { className } : {};
    return this.prisma.student.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: { rollNumber: 'asc' },
    });
  }

  async markAttendance(data: {
    studentId: string;
    date: Date;
    status: string;
    remarks?: string;
  }) {
    return this.prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId: data.studentId,
          date: data.date,
        },
      },
      update: {
        status: data.status,
        remarks: data.remarks,
      },
      create: data,
    });
  }

  async addGrade(data: {
    studentId: string;
    subjectId: string;
    marks: number;
    maxMarks: number;
    examType: string;
    examDate?: Date;
    remarks?: string;
  }) {
    return this.prisma.grade.create({ data });
  }

  async getSubjects(staffId: string) {
    return this.prisma.subject.findMany({
      where: { staffId },
      include: {
        class: true,
      },
    });
  }
}

