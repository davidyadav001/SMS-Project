import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, BookOpen, DollarSign, Calendar, FileText, Download, Settings, GraduationCap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: SidebarItem[];
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Auto-open sidebar on desktop
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

  const sidebarItems: SidebarItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { title: 'My Courses', icon: GraduationCap },
    { title: 'Grades & Results', icon: BookOpen },
    { title: 'Attendance', icon: Calendar },
    { title: 'Fee Management', icon: DollarSign },
    { title: 'Documents', icon: FileText },
    { title: 'Downloads', icon: Download },
    { title: 'Settings', icon: Settings },
  ];

  const handleItemClick = (item: SidebarItem) => {
    if (item.path) {
      navigate(item.path);
    }
    setActiveItem(item.title);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-40 lg:translate-x-0"
            >
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">SMS Portal</h2>
                    <p className="text-xs text-gray-400">Student Management</p>
                  </div>
                </div>
              </div>

              <nav className="px-4 py-6 space-y-2">
                {sidebarItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || activeItem === item.title;
                  
                  return (
                    <motion.button
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                <div className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 p-4 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Need Help?</p>
                  <p className="text-sm text-white font-medium">Contact Support</p>
                </div>
              </div>
            </motion.aside>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-30"
                onClick={() => setIsOpen(false)}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
