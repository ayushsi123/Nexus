import { useEffect, useRef } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Calendar, 
  Download, 
  Filter, 
  TrendingUp, 
  ChevronDown,
  Info
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { name: 'Jan', users: 4000, revenue: 2400, amt: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398, amt: 2210 },
  { name: 'Mar', users: 2000, revenue: 9800, amt: 2290 },
  { name: 'Apr', users: 2780, revenue: 3908, amt: 2000 },
  { name: 'May', users: 1890, revenue: 4800, amt: 2181 },
  { name: 'Jun', users: 2390, revenue: 3800, amt: 2500 },
  { name: 'Jul', users: 3490, revenue: 4300, amt: 2100 },
];

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];

export function AnalyticsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chart-container', {
        scrollTrigger: {
          trigger: '.chart-container',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold font-display tracking-tight">Analytics</h1>
           <p className="text-text-secondary text-sm">Deep insights into your business performance and user metrics.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 rounded-xl border border-white/5 bg-card/40 text-sm font-semibold flex items-center gap-2 hover:bg-white/5 transition-all">
             <Calendar className="w-4 h-4" /> Last 30 Days <ChevronDown className="w-3 h-3" />
           </button>
           <button className="px-5 py-2.5 rounded-xl btn-primary text-sm font-bold text-white flex items-center gap-2">
             <Download className="w-4 h-4" /> Export
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Growth Chart */}
        <div className="chart-container glass rounded-[2.5rem] p-8 border-white/5">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-bold">User Growth</h3>
                 <p className="text-xs text-text-secondary">Monthly active user trend</p>
              </div>
              <div className="flex items-center gap-1.5 text-green-500 font-bold text-sm">
                <TrendingUp className="w-4 h-4" /> +14.2%
              </div>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#E5E7EB' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Revenue Chart */}
        <div className="chart-container glass rounded-[2.5rem] p-8 border-white/5">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-bold">Revenue Breakdown</h3>
                 <p className="text-xs text-text-secondary">Global revenue by segment</p>
              </div>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Info className="w-4 h-4 text-text-secondary" />
              </button>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="revenue" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="chart-container lg:col-span-1 glass rounded-[2.5rem] p-8">
            <h3 className="text-xl font-bold mb-6">Device Distribution</h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={[
                           { name: 'Desktop', value: 45 },
                           { name: 'Mobile', value: 35 },
                           { name: 'Tablet', value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {[0,1,2].map((entry, index) => (
                           <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
               {['Desktop', 'Mobile', 'Tablet'].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                     <span className="text-xs text-text-secondary font-medium">{label}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="chart-container lg:col-span-2 glass rounded-[2.5rem] p-8 flex flex-col justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-accent-start/10 rounded-2xl flex items-center justify-center text-accent-start mx-auto">
               <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Optimization Suggestion</h3>
            <p className="text-text-secondary max-w-md mx-auto">
               Your user growth in "March" exceeded expectations by 24%. We recommend increasing server capacity in the EU-West region to maintain sub-50ms latency.
            </p>
            <div className="pt-4">
               <button className="px-8 py-3 rounded-xl border border-accent-start/30 text-accent-start font-bold hover:bg-accent-start/5 transition-all">
                  Run Detailed Simulation
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
