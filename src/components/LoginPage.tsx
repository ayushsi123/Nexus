import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Layers, ArrowRight, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = () => {
    login('demo@nexus.ai');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-start/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-accent-start to-accent-end rounded-2xl flex items-center justify-center shadow-xl shadow-accent-start/20">
               <Layers className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold font-display italic">NEXUS</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-text-secondary">Enter your credentials to access your dashboard</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-hidden focus:border-accent-start/50 focus:ring-4 focus:ring-accent-start/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold">Password</label>
                <button type="button" className="text-xs font-semibold text-accent-start hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-hidden focus:border-accent-start/50 focus:ring-4 focus:ring-accent-start/10 transition-all"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 group">
              Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-text-secondary font-bold tracking-widest leading-none py-1 rounded-full border border-white/10">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-accent-start/20 to-accent-end/20 hover:from-accent-start/30 hover:to-accent-end/30 border border-accent-start/30 rounded-2xl py-3 text-sm font-bold transition-all shadow-lg shadow-accent-start/10"
            >
              Demo Access
            </button>
            <button 
               type="button"
               className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-3 text-sm font-bold transition-all"
            >
              <Github className="w-4 h-4" /> Github
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-text-secondary text-sm">
          Don't have an account? <Link to="/" className="text-accent-start font-bold hover:underline">Start your free trial</Link>
        </p>
      </motion.div>
    </div>
  );
}
