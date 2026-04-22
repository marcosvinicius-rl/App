import { motion } from 'motion/react';
import { Flame, Clock, Trophy, Target, TrendingUp, Calendar, Zap, Bell, User } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area 
} from 'recharts';
import { cn } from '../lib/utils';

const dailyActivity = [
  { day: '01/35', performance: 40 },
  { day: '02/35', performance: 55 },
  { day: '03/35', performance: 45 },
  { day: '04/35', performance: 60 },
  { day: '05/35', performance: 35 },
  { day: '06/35', performance: 50 },
  { day: '07/35', performance: 58 },
  { day: '08/35', performance: 75 },
  { day: '09/35', performance: 65 },
  { day: '10/35', performance: 80 },
];

const activityTiles = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  active: [0,1,2, 8,9,10,11, 16,17,18,19,20, 24,25,26,27,28].includes(i),
}));

export default function Dashboard() {
  return (
    <div className="bg-black min-h-screen">
      {/* Top Header */}
      <header className="px-12 py-8 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-20">
         <div className="flex items-center gap-4">
            <h2 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">PÁGINA INICIAL</h2>
         </div>
         <div className="flex items-center gap-8">
            <button className="relative text-zinc-500 hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-kinetic-orange rounded-full border-2 border-black" />
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-zinc-800 p-0.5">
               <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-zinc-500" />
               </div>
            </div>
         </div>
      </header>

      <div className="p-12 space-y-12 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-12 gap-12">
          {/* Left Side: Summary */}
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h1 className="text-7xl font-black tracking-tighter text-white">Boa noite, Marcos.</h1>
              <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-xs">Quarta, 1 de Abril de 2026</p>
            </div>

            {/* Main Aesthetic Asset Card */}
            <div className="relative aspect-[3/4] bg-zinc-950 rounded-[60px] border border-zinc-900 flex flex-col items-center justify-center gap-12 overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,106,0,0.15),transparent_70%)]" />
               
               {/* Abstract Rock Asset Substitution */}
               <div className="relative w-80 h-80 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-zinc-800/30 rounded-full scale-125"
                  />
                  {/* Decorative Rock Shadow/Shape */}
                  <div className="w-64 h-64 bg-zinc-900 rounded-full blur-[80px] opacity-40 absolute" />
                  <img 
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80" 
                    alt="Abstract Kinetic Core"
                    className="w-full h-full object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_50px_rgba(255,106,0,0.4)]"
                  />
               </div>

               <div className="text-center relative z-10">
                  <div className="text-8xl font-black tracking-tighter text-white leading-none">
                     83h 32m
                  </div>
                  <p className="text-zinc-600 font-bold uppercase tracking-[0.5em] text-sm mt-4">SEM ERRAR</p>
               </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4">
               <StatBox label="INÍCIO DA SESSÃO" value="05:17am" sub="Hoje" />
               <StatBox label="HORAS TRABALHADAS" value="7h 52m" sub="Hoje" />
               <StatBox label="TAREFAS FEITAS" value="9/12" sub="Hoje" />
               <StatBox label="TAREFAS CHAVE" value="1/2" sub="Hoje" />
               <StatBox label="TAREFAS PERSONALIZADA" value="XXX" sub="Hoje" />
               <StatBox label="TAREFAS PERSONALIZADA" value="XXX" sub="Hoje" />
            </div>
          </div>

          {/* Right Side: Charts and Intensity */}
          <div className="col-span-12 lg:col-span-7 space-y-16">
            <div className="space-y-10">
               <header className="flex justify-between items-end">
                  <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white">Resumo Desafio</h2>
                  <p className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-xs mb-2">DIA 01/28</p>
               </header>

               <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                  <ActivityGrid title="5AM" />
                  <ActivityGrid title="TRABALHO FLOW" />
                  <ActivityGrid title="ATIVIDADE PERSONALIZADA" />
                  <ActivityGrid title="ATIVIDADE PERSONALIZADA" />
                  <ActivityGrid title="ATIVIDADE PERSONALIZADA" />
                  <ActivityGrid title="ATIVIDADE PERSONALIZADA" />
               </div>
            </div>

            <div className="space-y-8 pt-12 border-t border-zinc-900">
               <header>
                  <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Performance Geral</h2>
                  <p className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">MENSAL</p>
               </header>
               
               <div className="h-64 mt-12 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                      <XAxis dataKey="day" hide />
                      <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '12px' }}
                        labelStyle={{ display: 'none' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="performance" 
                        stroke="#ff6a00" 
                        strokeWidth={4} 
                        dot={{ fill: '#ff6a00', r: 6, strokeWidth: 2, stroke: '#000' }}
                        activeDot={{ r: 8, stroke: '#fff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  {/* Custom Axis Labels */}
                  <div className="flex justify-between mt-4 text-[9px] font-black text-zinc-700 uppercase tracking-widest px-2">
                     {dailyActivity.map(d => <span key={d.day}>{d.day}</span>)}
                  </div>

                  {/* Vertial Dia 28 Indicator */}
                  <div className="absolute right-12 top-0 bottom-0 w-px border-l-2 border-dashed border-kinetic-orange opacity-40">
                     <span className="absolute -top-6 -right-4 text-[9px] font-black text-kinetic-orange uppercase tracking-widest bg-black px-2">DIA 28</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="bg-zinc-950/50 p-8 rounded-[32px] border border-zinc-900 space-y-4">
       <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] leading-tight">{label}</p>
       <div className="space-y-1">
          <div className="text-3xl font-black text-white">{value}</div>
          <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{sub}</p>
       </div>
    </div>
  );
}

function ActivityGrid({ title }: { title: string }) {
  return (
    <div className="space-y-4">
       <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4">{title}</h4>
       <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: 32 }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "aspect-square rounded-[3px] transition-all",
                [0,1,2,3, 8,9,10, 16,17, 24,25,26].includes(i) 
                  ? "bg-kinetic-orange shadow-[0_0_8px_rgba(255,106,0,0.3)]" 
                  : "bg-zinc-900/50 border border-zinc-800/30"
              )}
            />
          ))}
       </div>
    </div>
  );
}
