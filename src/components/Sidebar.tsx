import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/', shape: 'diamond-filled' },
  { id: 'trabalho', label: 'Trabalho', path: '/trabalho', shape: 'circle' },
  { id: 'treinos', label: 'Treinos', path: '/treinos', shape: 'diamond' },
  { id: 'alimentacao', label: 'Alimentação', path: '/alimentacao', shape: 'ring' },
  { id: 'perfil', label: 'Perfil', path: '/perfil', shape: 'triangle' },
] as const;

function NavShape({ type, active }: { type: string; active: boolean }) {
  const color = active ? '#ff6a00' : '#52525b';
  const size = 14;
  switch (type) {
    case 'diamond-filled':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14">
          <rect x="7" y="0" width="9.9" height="9.9" transform="rotate(45 7 7)" fill={color} />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14">
          <rect x="7" y="0.5" width="9.2" height="9.2" transform="rotate(45 7 7)" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="5.5" fill={color} />
          <circle cx="7" cy="7" r="2" fill="#000" />
        </svg>
      );
    case 'ring':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="5.5" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 14 14">
          <polygon points="7,12 1.5,3 12.5,3" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

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

  return (
    <aside className="w-[240px] h-screen flex flex-col bg-black sticky top-0 shrink-0">
      {/* Brand */}
      <div className="pt-10 pb-14 flex flex-col items-center">
        {/* Toggle "logo" */}
        <div className="w-16 h-8 border-2 border-zinc-700 rounded-full flex items-center p-1">
          <div className="ml-auto w-5 h-5 bg-white rounded-full" />
        </div>
        <h1 className="mt-3 text-[22px] font-black tracking-[-0.02em] text-white">REAL MODE</h1>
      </div>

      {/* Nav */}
      <nav className="px-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative',
                isActive
                  ? 'bg-gradient-to-r from-kinetic-orange/20 to-transparent text-kinetic-orange'
                  : 'text-zinc-500 hover:text-zinc-300'
              )
            }
          >
            {({ isActive }) => (
              <>
                <NavShape type={item.shape} active={isActive} />
                <span className="text-[15px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer logout */}
      <div className="mt-auto p-6">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-red-400 transition-colors text-xs font-medium"
          title={userEmail || 'Sair'}
        >
          <LogOut className="w-4 h-4" />
          <span className="truncate">{userEmail?.split('@')[0] || 'Sair'}</span>
        </button>
      </div>
    </aside>
  );
}
