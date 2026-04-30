import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItemProps {
  to: string;
  icon: any;
  label: string;
  isActive: boolean;
  key?: React.Key;
}

const SidebarItem = ({ to, icon: Icon, label, isActive }: SidebarItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
      isActive 
        ? "bg-accent-start/20 text-accent-start border border-accent-start/30 shadow-xl shadow-accent-start/10" 
        : "text-text-secondary hover:bg-white/5 hover:text-text-primary hover:translate-x-1"
    )}
  >
    <Icon className={cn("w-5 h-5", isActive ? "text-accent-start" : "text-text-secondary group-hover:text-text-primary")} />
    <span className="font-medium">{label}</span>
    {isActive && (
      <motion.div 
        layoutId="active-pill" 
        className="ml-auto w-1.5 h-1.5 bg-accent-start rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" 
      />
    )}
  </Link>
);

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-card/30 backdrop-blur-xl sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-linear-to-br from-accent-start to-accent-end rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-start/20">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-display italic tracking-tighter">NEXUS</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 mb-6">
            <img 
              src={user?.avatar} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border border-white/10"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-text-secondary truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Layers className="w-6 h-6 text-accent-start" />
           <span className="text-lg font-bold font-display">NEXUS</span>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-text-secondary">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card z-[70] p-6 flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Layers className="w-8 h-8 text-accent-start" />
                  <span className="text-xl font-bold font-display italic">NEXUS</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <div key={item.to} onClick={() => setIsSidebarOpen(false)}>
                    <SidebarItem
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      isActive={location.pathname === item.to}
                    />
                  </div>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar - Desktop only */}
        <header className="hidden md:flex items-center justify-between h-20 px-8 border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-md z-40">
          <div className="flex items-center gap-2 text-text-secondary">
             <span className="text-sm font-medium">Pages</span>
             <ChevronRight className="w-4 h-4" />
             <span className="text-sm font-semibold text-text-primary capitalize">{location.pathname.substring(1)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-1.5 rounded-full text-xs font-mono border-accent-start/30 text-accent-start animate-pulse">
              LIVE SYSTEM READY
            </div>
            <button className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
               <img src={user?.avatar} alt="User" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
