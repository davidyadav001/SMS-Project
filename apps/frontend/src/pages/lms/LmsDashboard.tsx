import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../utils/api';
import { BookOpen, FileText, ClipboardList, LogOut, TrendingUp } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const LmsDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [materialsRes, assignmentsRes, progressRes] = await Promise.all([
        api.get('/lms/materials'),
        api.get('/lms/assignments'),
        api.get('/lms/progress'),
      ]);
      setMaterials(materialsRes.data);
      setAssignments(assignmentsRes.data);
      setProgress(progressRes.data);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Learning Management System
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Access your study materials and assignments
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

        {progress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Assignments
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progress.assignments?.graded || 0} / {progress.assignments?.total || 0}
                  </p>
                </div>
                <div className="bg-blue-500 p-3 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-white" />
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
                    Average Quiz Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progress.quizzes?.averageScore
                      ? `${Math.round(progress.quizzes.averageScore)}%`
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Study Materials
            </h2>
            <div className="space-y-3">
              {materials.slice(0, 5).map((material: any) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {material.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {material.type} • {material.subject?.name}
                    </p>
                  </div>
                  <button className="text-primary-600 dark:text-primary-400 hover:underline">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Assignments
            </h2>
            <div className="space-y-3">
              {assignments.slice(0, 5).map((assignment: any) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {assignment.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-primary-600 dark:text-primary-400 hover:underline">
                    Submit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LmsDashboard;

