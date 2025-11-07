import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../utils/api';
import {
  GraduationCap,
  Calendar,
  DollarSign,
  BookOpen,
  LogOut,
  TrendingUp,
  Clock,
  FileText,
  Bell,
  Download,
  Award,
  Users,
  BarChart3,
  Mail,
  Settings,
  Menu,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const StudentDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/student/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const attendanceData = dashboardData?.attendance || [];
  const presentCount = attendanceData.filter((a: any) => a.status === 'present').length;
  const absentCount = attendanceData.filter((a: any) => a.status === 'absent').length;
  const attendanceRate = attendanceData.length
    ? Math.round((presentCount / attendanceData.length) * 100)
    : 0;

  const grades = dashboardData?.grades || [];
  const averageGrade = grades.length
    ? Math.round(
        grades.reduce(
          (acc: number, g: any) => acc + (Number(g.marks) / Number(g.maxMarks)) * 100,
          0
        ) / grades.length
      )
    : 0;

  const fees = dashboardData?.fees || [];
  const pendingFees = fees.filter((f: any) => f.status === 'pending');
  const totalPending = pendingFees.reduce((acc: number, f: any) => acc + Number(f.amount), 0);

  const stats = [
    {
      title: 'Attendance Rate',
      value: `${attendanceRate}%`,
      icon: Clock,
      color: 'from-green-500 to-emerald-500',
      trend: attendanceRate >= 75 ? 'up' : 'down',
      subtitle: `${presentCount} present, ${absentCount} absent`,
    },
    {
      title: 'Average Grade',
      value: `${averageGrade}%`,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      trend: averageGrade >= 70 ? 'up' : 'down',
      subtitle: `${grades.length} assessments`,
    },
    {
      title: 'Pending Fees',
      value: `₹${totalPending.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-red-500 to-pink-500',
      subtitle: `${pendingFees.length} payments due`,
    },
    {
      title: 'Completed Courses',
      value: '12',
      icon: Award,
      color: 'from-purple-500 to-indigo-500',
      subtitle: 'This semester',
    },
  ];

  const quickLinks = [
    { title: 'Download Admit Card', icon: Download, color: 'bg-blue-500', href: '#' },
    { title: 'View Report Card', icon: FileText, color: 'bg-green-500', href: '#' },
    { title: 'Fee Payment', icon: DollarSign, color: 'bg-orange-500', href: '#' },
    { title: 'Time Table', icon: Calendar, color: 'bg-purple-500', href: '#' },
    { title: 'Study Materials', icon: BookOpen, color: 'bg-indigo-500', href: '#' },
    { title: 'My Certificates', icon: Award, color: 'bg-pink-500', href: '#' },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {dashboardData?.firstName || 'Student'}!
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dashboardData?.className} • Roll No. {dashboardData?.rollNumber} • {dashboardData?.user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{stat.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.button
                    key={link.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${link.color} text-white p-4 rounded-xl hover:shadow-lg transition-all flex flex-col items-center gap-2`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-medium text-center">{link.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Grades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Grades
                </h2>
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {grades.slice(0, 5).length > 0 ? (
                  grades.slice(0, 5).map((grade: any, index: number) => {
                    const percentage = Math.round((Number(grade.marks) / Number(grade.maxMarks)) * 100);
                    return (
                      <motion.div
                        key={grade.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <div className={`w-2 h-2 rounded-full ${
                              percentage >= 80 ? 'bg-green-500' :
                              percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <p className="font-semibold text-gray-900 dark:text-white capitalize">
                              {grade.examType}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(grade.examDate || grade.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {Number(grade.marks)}/{Number(grade.maxMarks)}
                          </p>
                          <p className={`text-sm font-medium ${
                            percentage >= 80 ? 'text-green-600' :
                            percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {percentage}%
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No grades available yet</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Fee Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Fee Status
                </h2>
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {fees.slice(0, 5).length > 0 ? (
                  fees.slice(0, 5).map((fee: any, index: number) => (
                    <motion.div
                      key={fee.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {fee.description || 'Fee Payment'}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          fee.status === 'paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : fee.status === 'overdue'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {fee.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Due: {new Date(fee.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{Number(fee.amount).toLocaleString()}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No fees to display</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Attendance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Attendance Summary (Last 30 Days)
              </h2>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View Full Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{presentCount}</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{absentCount}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{attendanceRate}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.slice(0, 10).map((attendance: any, index: number) => (
                    <tr
                      key={attendance.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                        {new Date(attendance.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          attendance.status === 'present'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : attendance.status === 'late'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {attendance.status === 'present' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : attendance.status === 'late' ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {attendance.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {attendance.remarks || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Course Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              My Course Information
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 p-6 rounded-xl">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Bachelor of Engineering - {dashboardData?.className || 'Computer Science'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Roll Number: {dashboardData?.rollNumber} | Academic Year: 2024-2025
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
