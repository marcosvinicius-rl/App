import { LayoutDashboard, Briefcase, Dumbbell, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'trabalho', label: 'Trabalho', icon: Briefcase, path: '/trabalho' },
  { id: 'treinos', label: 'Treinos', icon: Dumbbell, path: '/treinos' },
  { id: 'perfil', label: 'Perfil', icon: User, path: '/perfil' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email || null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const getInitials = (email: string | null) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  return (
    <aside className="w-[300px] h-screen border-r border-zinc-900 flex flex-col bg-black sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-8 bg-black border-2 border-zinc-900 rounded-full flex items-center p-1.5 cursor-pointer hover:border-zinc-700 transition-colors">
            <div className="w-4 h-4 bg-white rounded-full ml-auto" />
          </div>
          <div className="mt-4 text-center">
            <h1 className="font-black text-2xl italic tracking-[-0.1em] text-white">REAL MODE</h1>
            <p className="text-[10px] font-bold text-zinc-600 tracking-[0.4em] uppercase mt-1">Performance Tech</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2 py-10">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-5 px-8 py-5 rounded-none transition-all group relative",
                isActive 
                  ? "text-kinetic-orange" 
                  : "text-zinc-600 hover:text-zinc-400"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-kinetic-orange shadow-[0_0_15px_rgba(255,106,0,0.4)]"
                  />
                )}
                <item.icon className={cn("w-6 h-6", isActive ? "text-kinetic-orange" : "text-zinc-700")} />
                <span className="font-black text-xs tracking-[0.3em] uppercase">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-8">
        <div 
          onClick={handleSignOut}
          className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900 flex items-center gap-4 group cursor-pointer hover:border-red-900/50 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-kinetic-orange flex items-center justify-center text-black font-black shrink-0">
            {getInitials(userEmail)}
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-sm font-black text-white truncate">{userEmail?.split('@')[0] || 'Usuário'}</h3>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-2">
               Atleta Pro
               <LogOut className="w-3 h-3 text-zinc-800 group-hover:text-red-500 transition-colors" />
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
