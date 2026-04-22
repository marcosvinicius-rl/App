import { motion } from 'motion/react';
import { Award, Zap, Target, Flame, Star, Medal, ArrowUpRight, Edit3, Trophy, Dumbbell } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Perfil() {
  return (
    <div className="bg-black min-h-screen">
      <header className="px-12 py-8 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-20">
         <div className="flex items-center gap-4">
            <h2 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">INFORMAÇÕES PESSOAIS</h2>
         </div>
      </header>

      <div className="p-12 space-y-12 max-w-[1700px] mx-auto">
        <h1 className="text-5xl font-black italic uppercase tracking-tight text-white mb-2">PERFIL DO ATLETA</h1>

        <div className="grid grid-cols-12 gap-8">
           {/* Main Profile Card */}
           <div className="col-span-12 lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[50px] p-16 flex flex-col md:flex-row gap-16 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-96 bg-[linear-gradient(to_bottom,rgba(255,106,0,0.03),transparent)]" />
              
              <div className="relative">
                 <div className="w-56 h-56 rounded-full border-[6px] border-kinetic-orange p-3 shadow-[0_0_50px_rgba(255,106,0,0.15)] relative z-10">
                    <div className="w-full h-full rounded-full overflow-hidden grayscale contrast-125 brightness-75">
                       <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                 </div>
                 <div className="absolute -bottom-2 -left-2 w-14 h-14 bg-black border-4 border-zinc-900 rounded-full flex items-center justify-center relative z-20">
                    <Zap className="w-7 h-7 text-kinetic-orange fill-current" />
                 </div>
              </div>

              <div className="flex-1 space-y-10 relative z-10">
                 <div className="flex justify-between items-start">
                    <div>
                       <h2 className="text-8xl font-black italic uppercase tracking-[-0.05em] text-white leading-none">MARCOS</h2>
                       <div className="flex flex-wrap gap-3 mt-6">
                          <Tag label="EMPREENDEDOR" active />
                          <Tag label="TRÁFEGO DIRETO" />
                          <Tag label="ATLETA" />
                       </div>
                    </div>
                    <button className="bg-kinetic-orange text-black font-black uppercase tracking-[0.3em] text-[10px] px-8 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-xl">
                       EDITAR PERFIL
                    </button>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-zinc-900">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">14-DAY CONSISTENCY</p>
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">100% COMPLETION</span>
                    </div>
                    <div className="flex gap-2">
                       {Array.from({ length: 14 }).map((_, i) => (
                         <div key={i} className="flex-1 h-3 bg-kinetic-orange rounded-[2px] shadow-[0_0_10px_rgba(255,106,0,0.3)]" />
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Achievement Column */}
           <div className="col-span-12 lg:col-span-4 space-y-8 flex flex-col">
              <AchievementCard title="CONQUISTA PERSONALIZADA" value="X" sub="-X este mês" />
              <AchievementCard title="CONQUISTA PERSONALIZADA" value="X" sub="X" />
           </div>
        </div>

        {/* Small Progress Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <SmallMetricCard icon={Flame} label="STREAK ATUAL" value="42 DIAS" progress={65} info="RECORDE: 84 DIAS" />
           <SmallMetricCard icon={Zap} label="KM RODADOS" value="128.5 KM" info="+12% VS MÊS ANT." />
           <SmallMetricCard icon={Dumbbell} label="TREINOS" value="24 SESSÕES" info="META: 24 SESSÕES" />
           <SmallMetricCard icon={Target} label="TAREFAS HOJE" value="08/12" info="PENDÊNCIA CRÍTICA: 01" warning />
        </div>

        {/* Evolution Charts */}
        <div className="grid grid-cols-12 gap-8">
           <div className="col-span-12 lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[50px] p-12 space-y-12">
              <div className="flex justify-between items-center">
                 <h3 className="text-4xl font-black italic uppercase tracking-tight">EVOLUÇÃO VOLUME DE TREINO</h3>
                 <div className="text-[10px] font-black uppercase tracking-widest text-zinc-700 bg-black px-4 py-2 rounded-full border border-zinc-900">ÚLTIMOS 30 DIAS</div>
              </div>
              <div className="h-64 flex items-end gap-5">
                 {[45, 52, 48, 60, 55, 65, 84.5].map((v, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                      <div className="w-full relative">
                         <motion.div 
                           initial={{ height: 0 }}
                           animate={{ height: `${v}%` }}
                           className={cn(
                             "w-full rounded-t-2xl transition-all duration-1000",
                             i === 6 ? "bg-kinetic-orange shadow-[0_0_20px_rgba(255,106,0,0.3)]" : "bg-zinc-900 group-hover:bg-zinc-800"
                           )}
                         />
                         {i === 6 && (
                           <span className="absolute -top-10 left-1/2 -track-x-1/2 text-2xl font-black italic text-kinetic-orange leading-none">{v}kg</span>
                         )}
                      </div>
                      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">SEM {i + 1}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="col-span-12 lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-[50px] p-12 flex flex-col justify-between space-y-12">
              <h3 className="text-4xl font-black italic uppercase tracking-tight">TEMPO DE FOCO</h3>
              <div className="flex-1 flex items-center justify-center">
                 <div className="relative w-56 h-56">
                    {/* SVG Circle Progress */}
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="112" cy="112" r="90" fill="transparent" stroke="#18181b" strokeWidth="24" />
                       <circle cx="112" cy="112" r="90" fill="transparent" stroke="#ff6a00" strokeWidth="24" strokeDasharray={565} strokeDashoffset={565 * (1 - 0.7)} strokeLinecap="round" className="drop-shadow-[0_0_20px_rgba(255,106,0,0.4)]" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-5xl font-black text-white italic leading-none">6.5H</span>
                       <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mt-2">HOJE</span>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-kinetic-orange" /> BLOCO MANHÃ</span>
                    <span className="text-white">4.0H</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-zinc-800" /> BLOCO TARDE</span>
                    <span className="text-white">2.5H</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Badges Section */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[50px] p-12 space-y-10 text-center">
           <h3 className="text-3xl font-black italic uppercase tracking-tight text-white inline-block border-b-4 border-kinetic-orange pb-2">CONQUISTAS & BADGES</h3>
           <div className="grid grid-cols-3 md:grid-cols-6 gap-12 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                   <div className={cn(
                     "w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all",
                     i < 3 ? "bg-zinc-900 border-kinetic-orange text-kinetic-orange" : "bg-black border-zinc-900 text-zinc-800"
                   )}>
                      <Trophy className={cn("w-10 h-10", i < 3 ? "drop-shadow-[0_0_10px_rgba(255,106,0,0.4)]" : "")} />
                   </div>
                   <span className={cn("text-[9px] font-black uppercase tracking-widest", i < 3 ? "text-white" : "text-zinc-800")}>Badge Nome {i + 1}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ label, active }: { label: string, active?: boolean }) {
  return (
    <span className={cn(
      "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
      active ? "bg-kinetic-orange text-black" : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
    )}>
       {label}
    </span>
  );
}

function AchievementCard({ title, value, sub }: { title: string, value: string, sub: string }) {
  return (
    <div className="flex-1 bg-zinc-950 border border-zinc-900 p-10 rounded-[40px] flex flex-col justify-between group hover:border-kinetic-orange transition-all cursor-pointer">
       <header className="flex justify-between items-start">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest max-w-[120px] leading-[1.6]">{title}</p>
          <ArrowUpRight className="w-5 h-5 text-zinc-800 group-hover:text-kinetic-orange transition-colors" />
       </header>
       <div className="mt-8">
          <h4 className="text-6xl font-black italic text-white leading-none">{value}</h4>
          <p className="text-[10px] font-black text-kinetic-orange uppercase tracking-widest mt-2">{sub}</p>
       </div>
    </div>
  );
}

function SmallMetricCard({ icon: Icon, label, value, info, progress, warning }: { icon: any, label: string, value: string, info: string, progress?: number, warning?: boolean }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-10 rounded-[40px] space-y-6 group hover:border-zinc-800 transition-all cursor-pointer">
       <div className="flex items-center gap-3">
          <Icon className={cn("w-4 h-4", warning ? "text-kinetic-orange" : "text-zinc-700")} />
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>
       </div>
       <div className="space-y-1">
          <h4 className="text-4xl font-black italic text-white uppercase">{value}</h4>
          <p className={cn("text-[9px] font-black uppercase tracking-widest", warning ? "text-kinetic-orange" : "text-zinc-700")}>{info}</p>
       </div>
       {progress !== undefined && (
         <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-kinetic-orange shadow-[0_0_10px_rgba(255,106,0,0.4)]"
            />
         </div>
       )}
    </div>
  );
}
