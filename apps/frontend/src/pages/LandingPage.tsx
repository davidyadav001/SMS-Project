import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, FileText } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'student',
      title: 'Student Portal',
      icon: GraduationCap,
      route: '/student/login',
      color: 'from-blue-500 to-cyan-500',
      description: 'Access your grades, attendance, and fees',
    },
    {
      id: 'lms',
      title: 'LMS Portal',
      icon: BookOpen,
      route: '/lms/login',
      color: 'from-purple-500 to-pink-500',
      description: 'Study materials, assignments, and quizzes',
    },
    {
      id: 'staff',
      title: 'Staff Portal',
      icon: Users,
      route: '/staff/login',
      color: 'from-green-500 to-emerald-500',
      description: 'Manage attendance, grades, and announcements',
    },
    {
      id: 'admission',
      title: 'Admission Portal',
      icon: FileText,
      route: '/admission/login',
      color: 'from-orange-500 to-red-500',
      description: 'Apply for admission and track your application',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Radiant Readers' Academy
          </h1>
          <p className="text-xl text-gray-300">
            Student Management System
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(portal.route)}
                className="group relative cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${portal.color} rounded-2xl p-8 shadow-2xl transform transition-all duration-300 group-hover:shadow-3xl`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:bg-white/30 transition-colors">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {portal.title}
                    </h2>
                    <p className="text-white/90 text-sm">
                      {portal.description}
                    </p>
                    <motion.div
                      className="mt-6 text-white font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      Login →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-400 mt-12 text-sm"
        >
          Select a portal to continue
        </motion.p>
      </div>
    </div>
  );
};

export default LandingPage;

