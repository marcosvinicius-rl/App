/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Trabalho from './pages/Trabalho';
import Treinos from './pages/Treinos';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import { AlertCircle } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

function AppLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-900 border-t-kinetic-orange rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated and not on login page
  if (!session && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if authenticated and on login page
  if (session && isLoginPage) {
    return <Navigate to="/" replace />;
  }

  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                              import.meta.env.VITE_SUPABASE_URL !== "" && 
                              !import.meta.env.VITE_SUPABASE_URL.includes("your-project");

  return (
    <div className="flex min-h-screen bg-black">
      {!isSupabaseConfigured && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
          <div className="bg-kinetic-orange/10 border border-kinetic-orange/20 rounded-2xl p-4 backdrop-blur-xl flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-kinetic-orange mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-kinetic-orange text-[10px] font-black uppercase tracking-wider">Atenção: Supabase não configurado</p>
              <p className="text-zinc-500 text-[9px] font-bold leading-relaxed">
                As funcionalidades de login e banco de dados estão desativadas. Configure as chaves <code className="text-white">VITE_SUPABASE_URL</code> e <code className="text-white">VITE_SUPABASE_ANON_KEY</code> no painel de Segredos (ícone de engrenagem).
              </p>
            </div>
          </div>
        </div>
      )}
      {session && !isLoginPage && <Sidebar />}
      <div className={isLoginPage ? "w-full" : "flex-1 overflow-y-auto"}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trabalho" element={<Trabalho />} />
          <Route path="/treinos" element={<Treinos />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
