import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  BarChart2, 
  Users, 
  ShieldCheck,
  Shapes,
  Globe,
  Monitor,
  Circle
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Navbar Scroll Effect
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add('py-2', 'bg-background/80', 'mx-0', 'mt-0', 'max-w-full', 'rounded-none', 'border-b');
          headerRef.current.classList.remove('mt-4', 'mx-4', 'rounded-2xl', 'md:max-w-6xl');
        } else {
          headerRef.current.classList.remove('py-2', 'bg-background/80', 'mx-0', 'mt-0', 'max-w-full', 'rounded-none', 'border-b');
          headerRef.current.classList.add('mt-4', 'mx-4', 'rounded-2xl', 'md:max-w-6xl');
        }
      } 
    };
    window.addEventListener('scroll', handleScroll);

    // Initial Load Animation
    const ctx = gsap.context(() => {
      // Split text-like stagger for heading
      const headingParts = heroRef.current?.querySelectorAll('.stagger-text');
      if (headingParts) {
        gsap.from(headingParts, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'expo.out'
        });
      }

      gsap.from('.hero-subtext', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out'
      });

      gsap.from('.hero-btns', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power2.out'
      });

      gsap.from('.hero-visual', {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'expo.out'
      });

      // Number Counters
      const statsItems = document.querySelectorAll('.stat-number');
      statsItems.forEach((stat) => {
        const target = parseFloat(stat.getAttribute('data-target') || '0');
        const isBillion = stat.getAttribute('data-suffix') === 'B';
        const isK = stat.getAttribute('data-suffix') === 'k+';
        
        gsap.to(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
          },
          innerText: target,
          duration: 2,
          snap: { innerText: 0.1 },
          onUpdate: function() {
            const val = parseFloat(this.targets()[0].innerText);
            if (isBillion) stat.innerHTML = `$${val.toFixed(1)}B`;
            else if (isK) stat.innerHTML = `${Math.floor(val)}k+`;
            else stat.innerHTML = `${val.toFixed(1)}%`;
          }
        });
      });

      // Scroll reveals
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden selection:bg-accent-start/30">
      {/* Navbar */}
      <nav ref={headerRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass mx-4 mt-4 rounded-2xl md:mx-auto md:max-w-6xl transition-all duration-300">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-linear-to-r from-accent-start to-accent-end rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Shapes className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display italic tracking-tight">NEXUS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Solutions
          </button>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="px-5 py-2 text-sm font-semibold transition-all hover:text-accent-start">
            Sign In
          </Link>
          <Link to="/login" className="btn-primary px-6 py-2 rounded-xl text-sm font-bold text-white">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 max-w-7xl mx-auto relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-accent-start/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="hero-content space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-start/10 border border-accent-start/20 text-accent-start text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" />
              Revolutionizing management
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold font-display leading-[1.1] tracking-tight">
              <span className="block stagger-text">Build and Manage</span>
              <span className="block stagger-text">Your <span className="gradient-text">Data Seamlessly</span></span>
            </h1>
            <p className="hero-subtext text-lg md:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Modern SaaS dashboard built for performance and scalability. Empower your team with real-time insights and automated workflows.
            </p>
            <div className="hero-btns flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/dashboard" className="btn-primary w-full sm:w-auto px-8 py-4 rounded-2xl text-lg font-bold text-white flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-lg font-bold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 text-center"
              >
                View Demo
              </Link>
            </div>
            
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 text-sm text-text-secondary">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" /> Fixed monthly pricing
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" /> Cancel anytime
               </div>
            </div>
          </div>

          <div className="hero-visual relative hidden lg:block perspective-1000">
            <div className="glass rounded-3xl overflow-hidden shadow-2xl relative z-10 p-2 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-all duration-700 ease-out">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
                alt="Dashboard Preview" 
                className="rounded-2xl w-full object-cover aspect-video"
                referrerPolicy="no-referrer"
              />
              <div 
                onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-start/90 rounded-full flex items-center justify-center text-white backdrop-blur-md cursor-pointer hover:scale-110 transition-transform z-20 shadow-xl"
              >
                <Zap className="w-8 h-8 fill-current" />
              </div>
            </div>
            {/* Floatings - Adjusted to stay within bounds */}
            <div className="absolute top-0 right-0 glass p-4 rounded-2xl w-40 shadow-xl animate-bounce duration-[4000ms] z-20 translate-x-1/4 -translate-y-1/4">
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                    <BarChart2 className="w-3 h-3" />
                 </div>
                 <span className="text-[10px] font-bold">Revenue</span>
               </div>
               <div className="text-xl font-bold font-display leading-none text-white">+24.8%</div>
            </div>
            <div className="absolute bottom-0 left-0 glass p-4 rounded-2xl w-40 shadow-xl animate-bounce delay-700 duration-[5000ms] z-20 -translate-x-1/4 translate-y-1/4">
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Users className="w-3 h-3" />
                 </div>
                 <span className="text-[10px] font-bold">Active</span>
               </div>
               <div className="text-xl font-bold font-display leading-none text-white">12.4k</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Active Users', val: 200, suffix: 'k+' },
            { label: 'Market Cap', val: 5.2, suffix: 'B' },
            { label: 'Regions', val: 40, suffix: 'k+' }, // Using k+ suffix to reuse logic easily or just pass target
            { label: 'Uptime', val: 99.9, suffix: '%' },
          ].map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div 
                className="stat-number text-3xl md:text-5xl font-black font-display mb-2 text-white"
                data-target={stat.val}
                data-suffix={stat.suffix}
              >
                0
              </div>
              <div className="text-sm font-medium text-text-secondary uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="reveal-section py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-accent-start/10 border border-accent-start/20 text-accent-start text-xs font-bold uppercase tracking-widest">
                Our Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                Deep insights for <span className="gradient-text">scaling businesses</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                We've built a suite of tools that integrate perfectly with your existing workflow, allowing you to monitor performance and automate complex tasks with a single click.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Real-time data synchronization across all nodes',
                  'AI-powered anomaly detection and alerting',
                  'Custom report builder with drag-and-drop UI',
                  'Enterprise-grade security with 256-bit encryption'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-primary">
                    <CheckCircle2 className="w-5 h-5 text-accent-start shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <button className="px-8 py-3 rounded-xl border border-accent-start/30 text-accent-start font-bold hover:bg-accent-start/5 transition-all">
                  Explore Enterprise Solutions
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass rounded-[3rem] p-4 shadow-2xl relative z-10 transform lg:rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
                  alt="Data Analytics" 
                  className="rounded-[2.5rem] w-full shadow-inner object-cover aspect-video lg:aspect-auto h-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                   <Zap className="w-8 h-8 text-white fill-accent-start animate-pulse" />
                </div>
              </div>
              <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-accent-start/20 blur-[100px] rounded-full" />
              <div className="absolute -z-10 -top-10 -left-10 w-full h-full bg-purple-500/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="reveal-section py-24 px-6 bg-white/2 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-start/5 blur-[120px] rounded-full pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
               <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">See how your <span className="gradient-text">data could look</span></h2>
               <p className="text-text-secondary max-w-2xl mx-auto text-lg italic">Experience the precision of a real Nexus dashboard environment.</p>
            </div>
            
            <div className="grid lg:grid-cols-5 gap-8 items-start">
               <div className="lg:col-span-2 space-y-6">
                  {[
                    { label: 'Global Performance', val: '98.2', status: 'Stable', color: 'text-green-500' },
                    { label: 'Total Revenue', val: '$412,021', status: 'Growing', color: 'text-accent-start' },
                    { label: 'Server Latency', val: '12ms', status: 'Optimal', color: 'text-blue-400' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="glass p-6 rounded-3xl border-white/5 hover:border-accent-start/30 transition-all group cursor-pointer"
                    >
                       <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">{item.label}</div>
                       <div className="flex items-end justify-between">
                          <div className="text-3xl font-bold font-display">{item.val}</div>
                          <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 flex items-center gap-1", item.color)}>
                             <Circle className="w-1.5 h-1.5 fill-current" /> {item.status}
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
               
               <div className="lg:col-span-3 glass rounded-[3rem] p-8 min-h-[400px] relative overflow-hidden border-white/10 group shadow-2xl hover:shadow-accent-start/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-start to-accent-end" />
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     </div>
                     <div className="text-xs font-mono text-text-secondary">SYSTEM_OVERVIEW_V2.JS</div>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-accent-start/20 flex items-center justify-center text-accent-start">
                              <Zap className="w-5 h-5 fill-current" />
                           </div>
                           <div>
                              <div className="text-sm font-bold">Fast-Sync Engine</div>
                              <div className="text-xs text-text-secondary">Connected globally</div>
                           </div>
                        </div>
                        <div className="text-xs font-bold text-green-500">RUNNING</div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="text-[10px] font-bold text-text-secondary mb-1">DATA LOAD</div>
                           <div className="text-xl font-bold font-display">12.8 GB/s</div>
                           <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                              <div className="bg-accent-start h-full w-[70%]" />
                           </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="text-[10px] font-bold text-text-secondary mb-1">AI OVERRIDE</div>
                           <div className="text-xl font-bold font-display">ACTIVE</div>
                           <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                              <div className="bg-purple-500 h-full w-[40%] animate-pulse" />
                           </div>
                        </div>
                     </div>

                     <div className="p-4 rounded-2xl bg-accent-start/10 border border-accent-start/20 flex items-center justify-between">
                        <span className="text-sm font-bold text-accent-start">System Security Protocol Enabled</span>
                        <ShieldCheck className="w-5 h-5 text-accent-start" />
                     </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-linear-to-t from-card to-transparent pointer-events-none" />
               </div>
            </div>
         </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="reveal-section py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display px-2">Powerful tools to <span className="gradient-text">scale your business</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Dashboard Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="feature-card glass rounded-[2.5rem] p-10 group hover:border-accent-start/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-start/10 hover:-translate-y-2 border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left bg-white/[0.01]"
          >
            <div className="flex-1 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-display">Real-time Analytics Dashboard</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                Track users, revenue, and performance with clean, fast-loading dashboards that keep you ahead of the curve.
              </p>
              <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-widest pt-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Live Performance
              </div>
            </div>
            
            <div className="w-full lg:w-48 h-40 glass rounded-2xl border-white/10 p-4 space-y-3 shrink-0 bg-black/20">
               <div className="flex justify-between items-center bg-white/5 rounded-lg p-2">
                  <div className="w-8 h-2 bg-white/20 rounded-full" />
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
               </div>
               <div className="flex gap-1 items-end h-16 pt-2">
                  {[30, 60, 40, 80, 50, 90, 70].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-blue-500/30 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
               </div>
               <div className="space-y-1.5">
                  <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[75%]" />
                  </div>
                  <div className="flex justify-between text-[8px] text-text-secondary">
                    <span>REVENUE</span>
                    <span>$12,400</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: User Management */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="feature-card glass rounded-[2.5rem] p-10 group hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left bg-white/[0.01]"
          >
            <div className="flex-1 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-display">Advanced User Management</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                Manage users with search, filters, and full CRUD functionality. Powerful control for growing teams.
              </p>
              <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-widest pt-2">
                 <ShieldCheck className="w-4 h-4" /> Secure Access
              </div>
            </div>
            
            <div className="w-full lg:w-48 h-40 glass rounded-2xl border-white/10 p-4 space-y-2 shrink-0 bg-black/20">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center gap-3 p-1.5 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-purple-500/40 to-pink-500/40" />
                    <div className="flex-1 space-y-1">
                       <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
                       <div className="h-1.2 w-full bg-white/5 rounded-full" />
                    </div>
                 </div>
               ))}
               <div className="h-6 w-full bg-purple-500/20 rounded-lg flex items-center px-2 justify-between">
                  <div className="w-10 h-1.5 bg-purple-400/50 rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
               </div>
            </div>
          </motion.div>

          {/* Card 3: Scalable Architecture */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="feature-card glass rounded-[2.5rem] p-10 group hover:border-accent-end/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-end/10 hover:-translate-y-2 border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left bg-white/[0.01]"
          >
            <div className="flex-1 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-accent-end/20 to-accent-end/5 flex items-center justify-center text-accent-end group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-display">Built for Scale</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                Optimized frontend with React and API-driven backend for high performance at any volume.
              </p>
              <div className="flex items-center gap-2 text-accent-end text-[10px] font-bold uppercase tracking-widest pt-2">
                 <Shapes className="w-4 h-4" /> Global Delivery
              </div>
            </div>
            
            <div className="w-full lg:w-48 h-40 glass rounded-2xl border-white/10 p-4 relative overflow-hidden shrink-0 bg-black/20 flex flex-col justify-center">
               <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-accent-end/10 border border-accent-end/20 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-accent-end opacity-50" />
                  </div>
                  <div className="flex-1 h-px bg-linear-to-r from-accent-end/20 via-accent-end/60 to-accent-end/20 relative">
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-end rounded-full shadow-[0_0_8px_white]"
                      animate={{ left: ['0%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent-end/30 border border-accent-end/40 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-accent-end" />
                  </div>
               </div>
               <div className="mt-4 flex gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-1 w-4 bg-accent-end/20 rounded-full" />
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Card 4: UI/UX */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="feature-card glass rounded-[2.5rem] p-10 group hover:border-blue-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/10 hover:-translate-y-2 border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left bg-white/[0.01]"
          >
            <div className="flex-1 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-400/20 to-blue-400/5 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Monitor className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-display">Premium User Experience</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                Smooth animations, responsive design, and intuitive interfaces crafted for modern web experiences.
              </p>
              <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest pt-2">
                 <Zap className="w-4 h-4 fill-current" /> High Fidelity
              </div>
            </div>
            
            <div className="w-full lg:w-48 h-40 glass rounded-2xl border-white/10 p-5 shrink-0 bg-black/20 overflow-hidden relative">
               <div className="space-y-3 relative z-10">
                  <div className="h-2 w-3/4 bg-blue-400/30 rounded-full" />
                  <div className="h-10 w-full bg-linear-to-r from-blue-400/20 to-transparent rounded-xl border border-blue-400/20 p-2 overflow-hidden">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-400/30" />
                      <div className="flex-1 h-3 bg-blue-400/20 rounded-full mt-1.5" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <div className="h-8 w-1/2 bg-blue-400/10 rounded-lg border border-blue-400/10" />
                     <div className="h-8 w-1/2 bg-blue-400/50 rounded-lg shadow-[0_0_15px_rgba(96,165,250,0.4)]" />
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 blur-[30px] rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="reveal-section py-24 px-6 bg-white/2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl md:text-5xl font-bold font-display">Simple, <span className="gradient-text">transparent pricing</span></h2>
             <p className="text-text-secondary text-lg">Choose the plan that's right for your business scale.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Starter', price: '$0', desc: 'Perfect for side projects and learning.', 
                features: ['Up to 5 users', 'Basic analytics', '1GB Storage', 'Community support'],
                popular: false 
              },
              { 
                name: 'Pro', price: '$49', desc: 'Ideal for growing teams and startups.', 
                features: ['Unlimited users', 'Advanced analytics', '10GB Storage', 'Priority support', 'Custom themes'],
                popular: true 
              },
              { 
                name: 'Enterprise', price: 'Custom', desc: 'Scalable solutions for large companies.', 
                features: ['Dedicated VPC', 'Unlimited storage', 'SOC2 Compliance', '24/7 Phone support', 'Custom SLA'],
                popular: false 
              },
            ].map((plan, i) => (
              <div key={i} className={cn(
                "glass p-10 rounded-[2.5rem] border-white/5 relative flex flex-col group transition-all duration-500",
                plan.popular ? "border-accent-start/40 shadow-2xl shadow-accent-start/10 -translate-y-4" : "hover:border-white/20"
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-start text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-text-secondary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black font-display text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-text-secondary font-medium">/mo</span>}
                  </div>
                  <p className="text-sm text-text-secondary mt-4">{plan.desc}</p>
                </div>
                
                <div className="flex-1 space-y-4 mb-10">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent-start" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/login" className={cn(
                  "w-full py-4 rounded-2xl font-bold text-center transition-all",
                  plan.popular ? "btn-primary text-white" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                )}>
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="reveal-section py-24 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-accent-start/20 to-accent-end/20 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold font-display">Ready to scale?</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              See how your data could look inside a real dashboard. Start your 14-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link to="/dashboard" className="btn-primary px-10 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl hover:shadow-accent-start/40 flex items-center gap-2 group/btn">
                View Live Dashboard <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-4 rounded-2xl text-lg font-bold border border-white/10 hover:bg-white/10 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-text-secondary text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
           <Shapes className="w-5 h-5 text-accent-start" />
           <span className="text-base font-bold text-white font-display">NEXUS</span>
        </div>
        <p>© 2026 Nexus Infrastructure Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
