import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../utils/api';
import { FileText, Users, CheckCircle, XCircle, Clock, LogOut } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const AdmissionDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashboardRes, applicationsRes] = await Promise.all([
        api.get('/admission/dashboard'),
        api.get('/admission/applications'),
      ]);
      setDashboardData(dashboardRes.data);
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
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

  const stats = [
    {
      title: 'Total Applications',
      value: dashboardData?.total || 0,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending',
      value: dashboardData?.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Shortlisted',
      value: dashboardData?.shortlisted || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Accepted',
      value: dashboardData?.accepted || 0,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admission Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage student applications
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Applications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 10).map((app: any) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4">
                      {app.firstName} {app.lastName}
                    </td>
                    <td className="py-3 px-4">{app.email}</td>
                    <td className="py-3 px-4">{app.className}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          app.status === 'accepted'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : app.status === 'shortlisted'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdmissionDashboard;

