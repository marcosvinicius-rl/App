import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        alert('Cadastro realizado! Verifique seu email para confirmar a conta.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Kinetic Asset */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,0,0.05),transparent_70%)] pointer-events-none" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-zinc-900/20 rounded-full opacity-20 pointer-events-none"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-[48px] p-12 backdrop-blur-2xl shadow-2xl space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-10 border-2 border-zinc-900 rounded-full flex items-center p-2 mb-8 group cursor-pointer hover:border-kinetic-orange transition-colors">
               <div className="w-5 h-5 bg-white rounded-full ml-auto" />
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter text-white">REAL MODE</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">
              {isSignUp ? 'Crie Sua Conta de Performance' : 'Acesso de Alta Performance'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-500 text-[11px] font-bold uppercase tracking-wider leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-kinetic-orange transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none focus:border-kinetic-orange transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-kinetic-orange transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-5 pl-12 pr-12 text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none focus:border-kinetic-orange transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-6 bg-kinetic-orange text-black font-black uppercase tracking-[0.3em] text-sm rounded-2xl shadow-[0_15px_40px_rgba(255,106,0,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {isSignUp ? 'Criar Conta' : 'Entrar Agora'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="pt-4 text-center space-y-4">
            {!isSignUp && (
              <button type="button" className="text-[10px] font-black text-zinc-700 uppercase tracking-widest hover:text-zinc-400 transition-colors">
                Esqueceu sua senha?
              </button>
            )}
            <div className="flex items-center gap-4 justify-center">
               <div className="h-px w-8 bg-zinc-900" />
               <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">
                {isSignUp ? 'Já tem uma conta?' : 'Ou crie uma conta'}
               </span>
               <div className="h-px w-8 bg-zinc-900" />
            </div>
            <button 
              type="button" 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-[10px] font-black text-kinetic-orange uppercase tracking-widest hover:brightness-110 transition-all border-b-2 border-kinetic-orange/20 pb-0.5"
            >
              {isSignUp ? 'Fazer Login' : 'Cadastrar-se Agora'}
            </button>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-12 flex justify-between px-8">
           <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-kinetic-orange fill-current" />
              <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em]">Secure Authentication</span>
           </div>
           <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.2em]">v2.5.0-auth</span>
        </div>
      </motion.div>
    </div>
  );
}
