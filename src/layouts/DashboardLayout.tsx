import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText,
  MonitorPlay
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function DashboardLayout() {
  const { role, user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = {
    admin: [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
      { name: 'Manajemen User', href: '/app/admin/users', icon: Users },
      { name: 'Bank Soal', href: '/app/questions', icon: BookOpen },
      { name: 'Manajemen Ujian', href: '/app/admin/exams', icon: FileText },
    ],
    guru: [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
      { name: 'Bank Soal', href: '/app/questions', icon: BookOpen },
      { name: 'Kelola Ujian', href: '/app/guru/exams', icon: FileText },
    ],
    siswa: [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
      { name: 'Daftar Ujian', href: '/app/siswa/exams', icon: FileText },
    ]
  };

  const navItems = role ? navigation[role] : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 shrink-0">
          <Link to="/app" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              <MonitorPlay className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-slate-800">CBT PRIMA<br/><span className="text-primary-600">ONLINE</span></h1>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                              (item.href !== '/app' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary-50 text-primary-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary-600" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                {role}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-500 hidden sm:block">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
