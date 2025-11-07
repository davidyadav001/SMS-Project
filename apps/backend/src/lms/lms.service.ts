import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LmsService {
  constructor(private prisma: PrismaService) {}

  async getMaterials(subjectId?: string) {
    const where = subjectId ? { subjectId } : {};
    return this.prisma.material.findMany({
      where,
      include: {
        subject: {
          include: {
            class: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAssignments(subjectId?: string) {
    const where = subjectId ? { subjectId } : {};
    return this.prisma.assignment.findMany({
      where,
      include: {
        subject: {
          include: {
            class: true,
          },
        },
        submissions: {
          include: {
            assignment: true,
          },
        },
      },
      orderBy: { dueDate: 'desc' },
    });
  }

  async submitAssignment(data: {
    assignmentId: string;
    studentId: string;
    fileUrl?: string;
    fileName?: string;
  }) {
    return this.prisma.submission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId: data.assignmentId,
          studentId: data.studentId,
        },
      },
      update: {
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        submittedAt: new Date(),
      },
      create: {
        assignment: {
          connect: { id: data.assignmentId },
        },
        studentId: data.studentId,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        submittedAt: new Date(),
      },
    });
  }

  async getQuizzes(subjectId?: string) {
    const where = subjectId ? { subjectId } : {};
    return this.prisma.quiz.findMany({
      where,
      include: {
        attempts: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async startQuiz(quizId: string, studentId: string) {
    return this.prisma.quizAttempt.create({
      data: {
        quiz: {
          connect: { id: quizId },
        },
        studentId: studentId,
        answers: {},
        startedAt: new Date(),
      },
    });
  }

  async submitQuiz(attemptId: string, answers: any, score: number) {
    return this.prisma.quizAttempt.update({
      where: { id: attemptId },
      data: {
        answers,
        score,
        completed: true,
        completedAt: new Date(),
      },
    });
  }

  async getProgress(studentId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: { studentId },
      include: {
        assignment: true,
      },
    });

    const quizAttempts = await this.prisma.quizAttempt.findMany({
      where: { studentId, completed: true },
      include: {
        quiz: true,
      },
    });

    return {
      assignments: {
        total: submissions.length,
        graded: submissions.filter((s) => s.status === 'graded').length,
      },
      quizzes: {
        total: quizAttempts.length,
        averageScore: quizAttempts.length > 0
          ? quizAttempts.reduce((acc, q) => acc + Number(q.score || 0), 0) / quizAttempts.length
          : 0,
      },
    };
  }
}

