import React, { useState, useMemo } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Filter,
  UserPlus,
  Mail,
  Shield,
  Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
}

const INITIAL_USERS: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@design.co', role: 'Editor', status: 'Active', lastActive: '5 mins ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '3', name: 'Michael Chen', email: 'm.chen@tech.io', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: '4', name: 'Alisa Valdes', email: 'alisa@nexus.ai', role: 'Admin', status: 'Active', lastActive: '10 mins ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alisa' },
  { id: '5', name: 'Robert Fox', email: 'robert@nexus.ai', role: 'Editor', status: 'Active', lastActive: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  { id: '6', name: 'Esther Howard', email: 'esther@nexus.ai', role: 'Viewer', status: 'Active', lastActive: '4 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther' },
];

export function UsersPage() {
  const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as UserData['role'];

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, role } : u));
    } else {
      const newUser: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        status: 'Active',
        lastActive: 'Just now',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      };
      setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold font-display tracking-tight flex items-center gap-3">
             Users <span className="text-sm font-medium bg-white/5 px-2 py-0.5 rounded-md text-text-secondary">{users.length}</span>
           </h1>
           <p className="text-text-secondary text-sm">Manage your team members and their account permissions.</p>
        </div>
        <button 
          onClick={() => { setEditingUser(null); setIsModalOpen(true); }}
          className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
        >
           <UserPlus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card/40 border border-white/5 rounded-xl py-3 pl-11 pr-4 focus:outline-hidden focus:border-accent-start/50 transition-all text-sm"
          />
        </div>
        <button className="px-5 py-3 rounded-xl border border-white/5 bg-card/40 text-sm font-semibold flex items-center gap-2 hover:bg-white/5 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table Area */}
      <div className="glass rounded-[2rem] overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs font-bold text-text-secondary uppercase tracking-widest bg-white/2">
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Last Active</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user) => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} className="w-10 h-10 rounded-full bg-card" alt="" />
                        <div>
                          <div className="text-sm font-bold text-text-primary">{user.name}</div>
                          <div className="text-xs text-text-secondary">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className={cn("w-3 h-3 text-accent-start")} />
                        <span className="text-sm font-medium">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        user.status === 'Active' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      )}>
                        <Circle className={cn("w-1.5 h-1.5 fill-current")} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{user.lastActive}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={() => { setEditingUser(user); setIsModalOpen(true); }}
                            className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                          >
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-text-secondary hover:text-red-400 transition-colors"
                          >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Placeholder - Functional enough for CRUD demo */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass p-8 rounded-[2.5rem] border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold font-display mb-6">{editingUser ? 'Edit Member' : 'Invite New Member'}</h2>
              <form onSubmit={handleAddOrEdit} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-sm font-semibold ml-1">Full Name</label>
                   <input 
                    name="name"
                    required
                    defaultValue={editingUser?.name || ''}
                    placeholder="e.g. Jane Foster"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-hidden focus:border-accent-start transition-all"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold ml-1">Email Address</label>
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input 
                        name="email"
                        type="email"
                        required
                        defaultValue={editingUser?.email || ''}
                        placeholder="jane@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-hidden focus:border-accent-start transition-all"
                      />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold ml-1">Role</label>
                   <select 
                    name="role"
                    defaultValue={editingUser?.role || 'Viewer'}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-hidden focus:border-accent-start transition-all"
                   >
                     <option value="Admin">Admin</option>
                     <option value="Editor">Editor</option>
                     <option value="Viewer">Viewer</option>
                   </select>
                 </div>
                 <div className="flex gap-4 pt-4">
                   <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 font-bold border border-white/10 rounded-2xl hover:bg-white/5 transition-all"
                   >
                     Cancel
                   </button>
                   <button 
                    type="submit"
                    className="flex-1 btn-primary py-4 rounded-2xl font-bold text-white"
                   >
                     {editingUser ? 'Save Changes' : 'Send Invite'}
                   </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
