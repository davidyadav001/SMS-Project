import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.material.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.fee.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.class.deleteMany();
  await prisma.student.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.user.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.admissionForm.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  // Create Staff User
  const staffUser = await prisma.user.create({
    data: {
      email: 'staff@example.com',
      password: hashedPassword,
      role: 'staff',
      staff: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          department: 'Mathematics',
          position: 'Senior Teacher',
          salary: 50000,
        },
      },
    },
    include: {
      staff: true,
    },
  });

  // Get the staff ID
  const staffId = staffUser.staff?.id;
  if (!staffId) {
    throw new Error('Failed to create staff record');
  }

  // Create Student Users
  const studentUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'student@example.com',
        password: hashedPassword,
        role: 'student',
        student: {
          create: {
            firstName: 'Alice',
            lastName: 'Smith',
            className: '10A',
            rollNumber: 1,
            phone: '+1234567891',
            dob: new Date('2010-05-15'),
          },
        },
      },
      include: {
        student: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'student2@example.com',
        password: hashedPassword,
        role: 'student',
        student: {
          create: {
            firstName: 'Bob',
            lastName: 'Johnson',
            className: '10A',
            rollNumber: 2,
            phone: '+1234567892',
            dob: new Date('2010-08-20'),
          },
        },
      },
      include: {
        student: true,
      },
    }),
  ]);

  // Create Classes
  const class10A = await prisma.class.create({
    data: {
      name: '10A',
      grade: 10,
      section: 'A',
    },
  });

  // Create Subjects
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Mathematics',
        code: 'MATH101',
        classId: class10A.id,
        staffId: staffId,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Science',
        code: 'SCI101',
        classId: class10A.id,
        staffId: staffId,
      },
    }),
  ]);

  // Get the student IDs
  const student1Id = studentUsers[0].student?.id;
  const student2Id = studentUsers[1].student?.id;
  
  if (!student1Id) {
    throw new Error('Failed to create student records');
  }

  // Create Fees
  await Promise.all([
    prisma.fee.create({
      data: {
        studentId: student1Id,
        amount: 5000,
        dueDate: new Date('2024-02-01'),
        status: 'pending',
        description: 'Monthly Fee - February',
      },
    }),
    prisma.fee.create({
      data: {
        studentId: student1Id,
        amount: 5000,
        dueDate: new Date('2024-01-01'),
        status: 'paid',
        paidDate: new Date('2024-01-05'),
        description: 'Monthly Fee - January',
      },
    }),
  ]);

  // Create Attendance
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    await prisma.attendance.create({
      data: {
        studentId: student1Id,
        date: date,
        status: Math.random() > 0.1 ? 'present' : 'absent',
      },
    });
  }

  // Create Grades
  await Promise.all([
    prisma.grade.create({
      data: {
        studentId: student1Id,
        subjectId: subjects[0].id,
        marks: 85,
        maxMarks: 100,
        examType: 'midterm',
        examDate: new Date('2024-01-15'),
      },
    }),
    prisma.grade.create({
      data: {
        studentId: student1Id,
        subjectId: subjects[1].id,
        marks: 92,
        maxMarks: 100,
        examType: 'midterm',
        examDate: new Date('2024-01-20'),
      },
    }),
  ]);

  // Create Materials
  await Promise.all([
    prisma.material.create({
      data: {
        subjectId: subjects[0].id,
        title: 'Introduction to Algebra',
        description: 'Basic algebra concepts and examples',
        type: 'pdf',
        url: '/materials/algebra-intro.pdf',
        fileName: 'algebra-intro.pdf',
        fileSize: 1024000,
      },
    }),
    prisma.material.create({
      data: {
        subjectId: subjects[0].id,
        title: 'Quadratic Equations Video Lecture',
        description: 'Video explanation of quadratic equations',
        type: 'video',
        url: 'https://example.com/videos/quadratic-equations',
      },
    }),
  ]);

  // Create Assignments
  const assignment = await prisma.assignment.create({
    data: {
      subjectId: subjects[0].id,
      title: 'Algebra Practice Problems',
      description: 'Complete exercises 1-20 from chapter 5',
      dueDate: new Date('2024-02-15'),
      maxMarks: 100,
    },
  });

  // Create Quiz
  await prisma.quiz.create({
    data: {
      subjectId: subjects[0].id,
      title: 'Algebra Quiz 1',
      description: 'Test your understanding of basic algebra',
      duration: 30,
      maxMarks: 50,
      questions: [
        {
          question: 'What is 2x + 3 = 7?',
          options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
          correctAnswer: 0,
        },
        {
          question: 'Solve: 3x - 5 = 10',
          options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
          correctAnswer: 2,
        },
      ],
    },
  });

  // Create Announcements
  await Promise.all([
    prisma.announcement.create({
      data: {
        title: 'Midterm Examination Schedule',
        content: 'Midterm examinations will be held from February 15-20, 2024. Please prepare accordingly.',
        type: 'exam',
        target: 'student',
        createdBy: adminUser.id,
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'Fee Payment Reminder',
        content: 'Please pay your February fees before the due date to avoid late charges.',
        type: 'fee',
        target: 'student',
        createdBy: adminUser.id,
      },
    }),
  ]);

  // Create Admission Forms
  await Promise.all([
    prisma.admissionForm.create({
      data: {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@example.com',
        phone: '+1234567893',
        dob: new Date('2011-03-10'),
        address: '123 Main Street, City, State',
        className: '10A',
        status: 'pending',
        documents: [
          { name: 'birth_certificate.pdf', url: '/docs/birth_cert.pdf' },
          { name: 'previous_report.pdf', url: '/docs/report.pdf' },
        ],
      },
    }),
    prisma.admissionForm.create({
      data: {
        firstName: 'Diana',
        lastName: 'Prince',
        email: 'diana@example.com',
        phone: '+1234567894',
        dob: new Date('2011-07-22'),
        address: '456 Oak Avenue, City, State',
        className: '10A',
        status: 'shortlisted',
        documents: [
          { name: 'birth_certificate.pdf', url: '/docs/birth_cert2.pdf' },
        ],
      },
    }),
  ]);

  console.log('✅ Seed data created successfully!');
  console.log('\n📧 Default Login Credentials:');
  console.log('Admin: admin@example.com / password123');
  console.log('Staff: staff@example.com / password123');
  console.log('Student: student@example.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

