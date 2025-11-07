import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../utils/api';
import { Users, ClipboardList, BookOpen, LogOut } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const StaffDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/staff/dashboard');
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {dashboardData?.firstName} {dashboardData?.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {dashboardData?.position} • {dashboardData?.department}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Subjects
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.subjects?.length || 0}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Materials
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.subjects?.reduce(
                    (acc: number, sub: any) => acc + (sub._count?.materials || 0),
                    0
                  ) || 0}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Assignments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.subjects?.reduce(
                    (acc: number, sub: any) => acc + (sub._count?.assignments || 0),
                    0
                  ) || 0}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Subjects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData?.subjects?.map((subject: any) => (
              <div
                key={subject.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {subject.code} • {subject.class?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;

