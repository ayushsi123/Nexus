import { useEffect, useRef } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Users', value: '24,512', change: '+12.5%', isUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Net Revenue', value: '$84,232', change: '+18.2%', isUp: true, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Conversion Rate', value: '24.8%', change: '+4.1%', isUp: true, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Active Sessions', value: '1,204', change: '-2.4%', isUp: false, icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const activities = [
  { id: 1, user: 'Alex Morgan', action: 'Created new project', time: '2 mins ago', status: 'Completed', type: 'create' },
  { id: 2, user: 'Sarah Chen', action: 'Upgraded to Premium', time: '15 mins ago', status: 'Success', type: 'upgrade' },
  { id: 3, user: 'John Doe', action: 'Invited 3 members', time: '1 hour ago', status: 'Pending', type: 'invite' },
  { id: 4, user: 'Emily Blanco', action: 'Deleted workspace', time: '3 hours ago', status: 'Warning', type: 'delete' },
  { id: 5, user: 'Chris Evans', action: 'Logged in from SF', time: '5 hours ago', status: 'Success', type: 'login' },
];

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', active: 400 },
  { name: 'Tue', active: 600 },
  { name: 'Wed', active: 550 },
  { name: 'Thu', active: 900 },
  { name: 'Fri', active: 750 },
  { name: 'Sat', active: 1100 },
  { name: 'Sun', active: 950 },
];

export function DashboardOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.section-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold font-display tracking-tight">Overview</h1>
           <p className="text-text-secondary text-sm">Welcome back to your workspace dashboard.</p>
        </div>
        <button className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2">
           <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="stat-card glass p-6 rounded-2xl group transition-all border-white/5 hover:border-accent-start/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className={cn("flex items-center gap-1 text-sm font-bold", stat.isUp ? "text-green-500" : "text-red-500")}>
                {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-text-secondary text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold font-display">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 section-card glass rounded-3xl p-8 h-[450px] flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-start to-accent-end opacity-50" />
           <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-xl font-bold">System Load Matrix</h3>
                <p className="text-xs text-text-secondary">Network throughput last 24h • <span className="text-green-500 font-bold uppercase tracking-widest text-[9px]">Live Data</span></p>
             </div>
             <div className="flex gap-2">
               {['D', 'W', 'M', 'Y'].map(t => (
                 <button key={t} className={cn("w-8 h-8 rounded-lg text-xs font-bold transition-all", t === 'D' ? "bg-accent-start text-white shadow-lg shadow-accent-start/30" : "hover:bg-white/5 text-text-secondary")}>
                   {t}
                 </button>
               ))}
             </div>
           </div>
           <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}
                    />
                    <Area type="monotone" dataKey="active" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#activeGradient)" animationDuration={2000} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase font-bold text-text-secondary tracking-widest">
              <div>Peak Flow: 1,842 requests/s</div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 All Systems Operational
              </div>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="section-card glass rounded-3xl p-8 h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <button className="text-xs font-bold text-accent-start hover:underline">Clear</button>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent-start/10 flex items-center justify-center text-accent-start font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card",
                    activity.status === 'Success' || activity.status === 'Completed' ? "bg-green-500" : 
                    activity.status === 'Pending' ? "bg-blue-500" : "bg-orange-500"
                  )} />
                </div>
                <div className="min-w-0 flex-1">
                   <p className="text-sm font-bold text-text-primary mb-0.5 truncate group-hover:text-accent-start transition-colors">{activity.user}</p>
                   <p className="text-xs text-text-secondary truncate">{activity.action}</p>
                   <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-bold text-text-secondary pr-2 border-r border-white/10 uppercase tracking-tighter">{activity.time}</span>
                      <span className="text-[9px] font-bold text-text-secondary tracking-widest uppercase">{activity.status}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 rounded-xl border border-white/5 text-sm font-bold text-text-secondary hover:bg-white/10 transition-all">
            Full Audit Path
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple internal helper for cn in this file if needed, but we have /lib/utils
import { cn } from '../lib/utils';
