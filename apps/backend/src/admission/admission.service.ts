import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdmissionService {
  constructor(private prisma: PrismaService) {}

  async createApplication(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
    address: string;
    className: string;
    documents?: any[];
  }) {
    return this.prisma.admissionForm.create({
      data: {
        ...data,
        dob: new Date(data.dob),
      },
    });
  }

  async getApplications(status?: string) {
    const where = status ? { status } : {};
    return this.prisma.admissionForm.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
    });
  }

  async getApplication(id: string) {
    return this.prisma.admissionForm.findUnique({
      where: { id },
    });
  }

  async updateApplicationStatus(id: string, status: string, remarks?: string) {
    return this.prisma.admissionForm.update({
      where: { id },
      data: {
        status,
        remarks,
        reviewedAt: new Date(),
      },
    });
  }

  async getDashboard() {
    const [total, pending, shortlisted, accepted, rejected] = await Promise.all([
      this.prisma.admissionForm.count(),
      this.prisma.admissionForm.count({ where: { status: 'pending' } }),
      this.prisma.admissionForm.count({ where: { status: 'shortlisted' } }),
      this.prisma.admissionForm.count({ where: { status: 'accepted' } }),
      this.prisma.admissionForm.count({ where: { status: 'rejected' } }),
    ]);

    return {
      total,
      pending,
      shortlisted,
      accepted,
      rejected,
    };
  }
}

